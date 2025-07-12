const axios = require("axios");

async function igstalk(username) {
  try {
    const { data } = await axios.get(`https://api.nekorinn.my.id/stalk/instagram?username=${username}`);

    if (!data.status) throw "Gagal mengambil data. Username mungkin salah atau akun bersifat private.";

    return {
      username: data.result.username,
      fullname: data.result.fullName,
      profile: data.result.profileImage,
      post: data.result.uploads,
      followers: data.result.followers,
      following: null, // tidak tersedia dari API
      bio: data.result.bio || "Tidak ada bio",
      verified: data.result.isVerified,
      engagement: data.result.engagement
    };
  } catch (err) {
    throw (typeof err === 'string' ? err : "Terjadi kesalahan saat mengambil data dari API.");
  }
}

module.exports = { igstalk };