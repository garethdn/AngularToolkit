import { AngularToolkitPage } from './app.po';

describe('angular-toolkit App', () => {
  let page: AngularToolkitPage;

  beforeEach(() => {
    page = new AngularToolkitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
