import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { loadStripe } from "@stripe/stripe-js";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig)

export const getFirebaseAPI = () => {
  try {
    const functions = getFunctions(app)
    const helloWorld = httpsCallable(functions, 'helloWorld');
    helloWorld({name: "hoge"})
      .then((result) => {
        const data = result.data;
        console.log("🚀 ~ file: firebase.ts ~ line 24 ~ .then ~ data", data)
      })
      .catch((error) => {
        const message = error.message;
        console.log("🚀 ~ file: firebase.ts ~ line 30 ~ getFirebaseAPI ~ message", message)
        console.log("🚀 ~ file: firebase.ts ~ line 30 ~ getFirebaseAPI ~ err", error)
      });
  } catch (error) {
    console.log("🚀 ~ file: firebase.ts ~ line 32 ~ getFirebaseAPI ~ error", error)
    
  }
};

export const getStripeAPI = async () => {
  try {
    const functions = getFunctions(app)
    const createPaymentSession = httpsCallable(functions, 'createPaymentSession');
     // 公開可能キーをもとに、stripeオブジェクトを作成
    const stripePromise = loadStripe(
      ""
    );
    const stripe = await stripePromise;
    createPaymentSession({name: "hoge"})
      .then((result) => {
        const data:any = result.data;
        console.log("🚀 ~ file: firebase.ts ~ line 24 ~ .then ~ data", data)
        stripe!
        .redirectToCheckout({
          sessionId: data.id,
        })
        .then((result) => {
          console.log(result);
        });
      })
      .catch((error) => {
        const message = error.message;
        console.log("🚀 ~ file: firebase.ts ~ line 30 ~ getFirebaseAPI ~ message", message)
        console.log("🚀 ~ file: firebase.ts ~ line 30 ~ getFirebaseAPI ~ err", error)
      });
  } catch (error) {
    console.log("🚀 ~ file: firebase.ts ~ line 32 ~ getFirebaseAPI ~ error", error) 
  }
}


