/* eslint-env mocha */
if (typeof window === 'undefined') {
  require('../../app/bestPractices');
  var { expect } = require('chai');
}

describe('best practices', () => {
  it('you should avoid global variables', (done) => {
    bestPracticesAnswers.globals();
    try {
      expect(myObject).not.to.be.ok;
    } catch (error) {
      done();
    }
  });

  it('you should use parseInt correctly', () => {
    expect(bestPracticesAnswers.parseInt('12')).to.eql(12);
    expect(bestPracticesAnswers.parseInt('12px')).to.eql(12);
    expect(bestPracticesAnswers.parseInt('0x12')).to.eql(0);
  });

  it('you should understand strict comparison', () => {
    expect(bestPracticesAnswers.identity(1, '1')).to.eql(false);
    expect(bestPracticesAnswers.identity(1, 1)).to.eql(true);
    expect(bestPracticesAnswers.identity(0, false)).to.eql(false);
  });
});
