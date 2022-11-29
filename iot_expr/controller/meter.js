import awsService from '../server/awsConfig.js';
// const awsService=require('../server/awsConfig');

export default class MeterController {

  static async on(req, res) {
    let clientTokenUpdate;

    awsService.thingShadows.register('USER_METER', {}, async () => {
      const userMeterState = {
        state: {
          desired: {
            status: 'ON',
          },
        },
      };
      clientTokenUpdate = awsService.thingShadows.update(
        'USER_METER',
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
    awsService.thingShadows.end();
    return res.status(200).json({
      status: true,
      message: 'Meter successfully disconnected',
    });
  }
}
// module.exports=MeterController;