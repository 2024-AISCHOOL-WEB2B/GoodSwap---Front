// const axios = require('axios');

// const registerPayment = async () => {
//     try {
//         // 엑세스 토큰 발급
//         const tokenResponse = await axios.post('https://api/order/payment/token', {
//             imp_key: 'your-client-id', // 포트원에서 발급받은 REST API 키
//             imp_secret: 'your-rit-secret', // 포트원에서 발급받은 REST API Secret
//         });
//         const { access_token } = tokenResponse.data.response;

//         // 결제 사전 등록 요청
//         const prepareResponse = await axios.post(
//             'https://api/order/payment/token',
//             {
//                 merchant_uid: 'unique_order_id_123', // 가맹점 주문번호
//                 amount: 420000, // 결제 예정 금액
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`, // 인증 토큰
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         console.log('결제 사전 등록 성공:', prepareResponse.data);
//     } catch (error) {
//         console.error('결제 사전 등록 실패:', error.response?.data || error.message);
//     }
// };

// registerPayment();
