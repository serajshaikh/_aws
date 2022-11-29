import awsService from '../server/awsConfig.js';
// const awsService=require('../server/awsConfig');

export default class MeterController {

  static async on(req, res) {
    let clientTokenUpdate;

    awsService.thingShadows.register('my-raspberry-01', {}, async () => {
      const userMeterState = {
        state: {
          desired: {
            status: 'ON-hai',
          },
        },
      };
      clientTokenUpdate = awsService.thingShadows.update(
        'my-raspberry-01',
        userMeterState
      );

      if (clientTokenUpdate === null) {
        return res.status(400).send({
          status: false,
          error: 'update shadow failed, operation still in progress',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Meter successfully connected',
      });
    });
  }

  static async off(req, res) {
    const userMeterState = {
      state: {
        desired: {
          status: 'OFF',
        },
      },
    };
   awsService.thingShadows.update(
      'my-raspberry-01',
      userMeterState
    );
    awsService.thingShadows.end();
    return res.status(200).json({
      status: true,
      message: 'Meter successfully disconnected',
    });
  }
}
// module.exports=MeterController;