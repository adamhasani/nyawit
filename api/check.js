const API = 'https://www.nanobana.net/api';
// Masukkan cookie yang sama dengan start.js di sini
const COOKIE = '__Host-authjs.csrf-token=30520470455c3e13eaed1f36a6d404badce7ea465230c2c98e0471bb72646a4e%7C3e869582574ac97763adf0b3d383e68275475d375f1926fd551aa712e4adbd24; __Secure-authjs.callback-url=https%3A%2F%2Fwww.nanobana.net%2F%23generator; g_state={"i_l":0,"i_ll":1769401024886,"i_b":"VKxqLQ5eJ0B2gQmnduZzPCwsZ1q418d0cjhhXWlbxTU","i_e":{"enable_itp_optimization":0}}; __Secure-authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiSWRmbEhwMk0teEF1V3l6Nkg1bHZrRHdOc0ZiM3BBOHVvMjNjaXhaZ1MxT1hHWUFNUUc0MGY0bW5XZnFtdWZyWnFYbHM2SFZILUZncDlvaUk5dTdIbHcifQ..lasLfR5B2_Rf2Q_F3K6fgw.Tro9GauoZdTk0Dtt_Dt6HJK5eG_OZoP66i6LKgtDzaj6v42BIhO-Hre144rB3wYfFQovDVKXyxAGG8WyP5FW_H3WTJP-it5Sm8xfmj7WWSbAzXGXPOcw-782yVRqLAK4cxuNNGVYCNJhOxLnKEAh_3bRBUHpkDmDfsnC8z5FmTtURhA32n-KiMW5zcPKKhY6haApLrOfJ3Y31NxjzVRDa-T-1vjTITsyFBsZW_WaFY8OHRz7giNl-rKbfm-OKEd_nvU0NqdnEUS_LBYN-5b7u5f1buYMdIt8M2g6YIaYwhdXIGZ-x9HpJz2API7NrhKN5tTwaN6UMPFq4ZSfEdYEWipfmUMacv5oGfW7AmaAWMoVvYs5tudzI00D_M0GE3A5F20fLFRMRgDOsI3cs5-e0TzGOTobv3D7UGau8XCrxX5exf5L6Q1C15A6xwtPpRJu1cOg1BlnOXf0gueF4sAAcg._Bl87onRhLiZFFuzC-e1_udKFzuUFVAfhW4FfmtUufE';

const HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'cookie': COOKIE
};

export default async function handler(req, res) {
    try {
        const { taskId, prompt } = req.query;
        const checkRes = await fetch(`${API}/sora2/image-to-video/task/${taskId}?save=1&prompt=${encodeURIComponent(prompt)}`, {
            headers: HEADERS
        });
        const data = await checkRes.json();

        if (data.status === 'completed') {
            return res.status(200).json({ status: 'completed', videoUrl: data.saved?.[0]?.url });
        } else if (data.status === 'failed') {
            return res.status(200).json({ status: 'failed', error: data.provider_raw?.data?.failMsg });
        }
        
        // Kalau masih processing
        res.status(200).json({ status: 'processing' });
    } catch (error) {
        res.status(500).json({ status: 'failed', error: error.message });
    }
}
