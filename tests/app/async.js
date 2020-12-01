/* eslint-env mocha */
if (typeof window === 'undefined') {
  require('../../app/async');
  var { expect } = require('chai');
}

describe('async behavior', () => {
  it('you should understand how to use promises to handle asynchronicity', (done) => {
    let flag = false;
    let finished = 0;
    const total = 2;

    function finish(_done) {
      // eslint-disable-next-line no-plusplus
      if (++finished === total) { _done(); }
    }

    asyncAnswers.async(true).then((result) => {
      flag = result;
      expect(flag).to.eql(true);
      finish(done);
    });

    asyncAnswers.async('success').then((result) => {
      flag = result;
      expect(flag).to.eql('success');
      finish(done);
    });

    expect(flag).to.eql(false);
  });

  it('you should be able to retrieve data from the server and return a sorted array of names', (done) => {
    const url = '/data/testdata.json';

    asyncAnswers.manipulateRemoteData(url).then((result) => {
      expect(result).to.have.length(5);
      expect(result.join(' ')).to.eql('Adam Alex Matt Paul Rebecca');
      done();
    });
  });
});
