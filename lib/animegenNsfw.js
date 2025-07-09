const axios = require('axios');
const ProxyAgent = require('@rynn-k/proxy-agent');
const proxy = new ProxyAgent('./node_modules/Arisu-MD/database/proxy.txt', { random: true }); // Ubah path proxy

async function nsfwimage(prompt, options = {}) {
    try {
        const {
            negative_prompt = 'lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry',
            style = 'anime',
            width = 1024,
            height = 1024,
            guidance_scale = 7,
            inference_steps = 28
        } = options;

        const _style = ['anime', 'real', 'photo'];

        if (!prompt) throw new Error('Prompt is required');
        if (!_style.includes(style)) throw new Error(`Available styles: ${_style.join(', ')}`);
        if (width < 256 || width > 1216) throw new Error('Min width: 256, Max width: 1216');
        if (height < 256 || height > 1216) throw new Error('Min height: 256, Max height: 1216');
        if (guidance_scale < 0 || guidance_scale > 20) throw new Error('Min guidance scale: 0, Max guidance scale: 20');
        if (inference_steps < 1 || inference_steps > 28) throw new Error('Max inference steps: 28');

        const agent = proxy.config();
        const session_hash = Math.random().toString(36).substring(2);

        const queueJoinURL = `https://heartsync-nsfw-uncensored${style !== 'anime' ? `-${style}` : ''}.hf.space/gradio_api/queue/join?`;
        const { data: joinResp } = await axios.post(queueJoinURL, {
            data: [
                prompt,
                negative_prompt,
                0,
                true,
                width,
                height,
                guidance_scale,
                inference_steps
            ],
            event_data: null,
            fn_index: 2,
            trigger_id: 16,
            session_hash
        }, agent);

        const queueDataURL = `https://heartsync-nsfw-uncensored${style !== 'anime' ? `-${style}` : ''}.hf.space/gradio_api/queue/data?session_hash=${session_hash}`;
        const { data } = await axios.get(queueDataURL, agent);

        let result;
        const lines = data.split('\n\n');
        for (const line of lines) {
            if (line.startsWith('data:')) {
                const parsed = JSON.parse(line.substring(6));
                if (parsed.msg === 'process_completed') {
                    result = parsed.output.data[0].url;
                }
            }
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = nsfwimage;