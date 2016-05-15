describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Plone';
    expect(subject).toEqual(result);
  });

});
