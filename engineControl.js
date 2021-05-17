import { Gpio } from 'pigpio';  //apt-get install wiringpi 선행 필수,, 바인딩 하는것
const engineControl = async(_, args, context) => {
  try {
    console.log(context.tokens);
    console.log(1)
    //토큰 검사 먼저 한다
    const tokenData=await context.jwt.verify(args.token,'hahaha123');
    console.log(2)
    //토큰이 없으면 에러를 리턴한다
    if(tokenData===null)return 'error';
    console.log(3)
    //엔진 상태 검사 코드//
    if (args.status === 'false') {
      if (context.controlObject.waveEngine === false) {
        return 'success';
      } else {
        context.controlObject.waveEngine = false;
        if (context.controlObject.engineId !== null) {
          clearTimeout(context.controlObject.engineId);
        }
        return 'notListen';
      }
      console.log(4)
    } else {
      if (context.controlObject.waveEngine === false){
        context.controlObject.waveEngine=true;
        var sensor = require("node-dht-sensor");

        sensor.read(11, 4, function(err, temperature, humidity) {
          if (!err) {
            console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
          }
        });
      }
     
    //   if (context.controlObject.waveEngine === false) {
    //     context.controlObject.waveEngine=true;
    //     console.log(5)
    //       //라즈베리파이 기능구현 코드
    //       let doorLock=false;
    //       let count = 3;
    //       let abs = 0;
    //       const MICROSECDONDS_PER_CM = 1e6 / 34321;
    //       const trigger = new Gpio(23, { mode: Gpio.OUTPUT });
    //       const echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });
    //       trigger.digitalWrite(0);
    //       console.log(6)
    //       const watchHCSR04 = () => {
    //         let startTick;
    //         echo.on('alert', (level, tick) => {
    //           if (level == 1) {
    //             startTick = tick;
    //           } else {
    //             const endTick = tick;
    //             const diff = (endTick - startTick) / 2 / MICROSECDONDS_PER_CM; // Unsigned 32 bit arithmetic
    //             console.log(`ABS DIS : ${abs}`);
    //             console.log(`NOW DIS : ${diff}`);
    //             if (count > 0) {
    //               count--;
    //               abs += diff;
    //             } else if (count === 0) {
    //               count--;
    //               abs /= 3;
    //               doorLock=true;
    //             } else {
    //               if ((diff - 1.5 > abs || diff + 1.5 < abs) && doorLock===true) {
    //                 doorLock=false;

    //                 // let message1 = {
    //                 //   notification: {
    //                 //     title: '(경고!)문이 열렸습니다!',
    //                 //     body: '문이 열렸습니다!!!!!!'
    //                 //   }
    //                 // }
    //                 // context.tokens.forEach(t => {
    //                 //   context.admin.messaging().sendToDevice(t, message1).then(function (response) {
    //                 //     console.log('Successfully sent message: : ', response)
    //                 //   })
    //                 //     .catch(function (err) {
    //                 //       console.log('Error Sending message!!! : ', err)
    //                 //     })
    //                 // });


    //               }


    //               if((diff - 1.5 < abs && diff + 1.5 > abs) && doorLock===false){
    //                 doorLock=true;
    //                 let message2 = {
    //                   notification: {
    //                     title: '(경고!)문이 닫혔습니다!',
    //                     body: '문이 닫혔습니다!!!!!!'
    //                   }
    //                 }
    //                 context.tokens.forEach(t => {
    //                   context.admin.messaging().sendToDevice(t, message2).then(function (response) {
    //                     console.log('Successfully sent message: : ', response)
    //                   })
    //                     .catch(function (err) {
    //                       console.log('Error Sending message!!! : ', err)
    //                     })
    //                 });
    //               }


    //             }
    //           }
    //         });
    //       };
    //       console.log(7)
    //       watchHCSR04();
    //       console.log(8)
    //       context.controlObject.engineId = setInterval(() => {
    //         trigger.trigger(2, 1);
    //       }, 200);
    //       console.log(9)
    //    console.log('haha')
    //     return 'success';
    //   } else return 'success';
    // 

    }
  } catch (err) {
    return 'error';
  }
}
export default engineControl;