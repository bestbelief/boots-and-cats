import { BootsAndCatsPage } from './app.po';

describe('boots-and-cats App', () => {
  let page: BootsAndCatsPage;

  beforeEach(() => {
    page = new BootsAndCatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
