import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('this test must return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('fetchBoard', () => {});

  describe('createBoard', () => {});
});
