/* eslint-env mocha */
if (typeof window === 'undefined') {
  require('../../app/functions');
  var { expect } = require('chai');
}

describe('functions', () => {
  let sayItCalled = false;
  const sayIt = function (greeting, name, punctuation) {
    sayItCalled = true;
    return `${greeting}, ${name}${punctuation || '!'}`;
  };

  beforeEach(() => {
    sayItCalled = false;
  });

  it('you should be able to use an array as arguments when calling a function', () => {
    const result = functionsAnswers.argsAsArray(sayIt, ['Hello', 'Ellie', '!']);
    expect(result).to.eql('Hello, Ellie!');
    expect(sayItCalled).to.be.ok;
  });

  it('you should be able to change the context in which a function is called', () => {
    const speak = function () {
      return sayIt(this.greeting, this.name, '!!!');
    };
    const obj = {
      greeting: 'Hello',
      name: 'Rebecca',
    };

    const result = functionsAnswers.speak(speak, obj);
    expect(result).to.eql('Hello, Rebecca!!!');
    expect(sayItCalled).to.be.ok;
  });

  it('you should be able to return a function from a function', () => {
    expect(functionsAnswers.functionFunction('Hello')('world')).to.eql('Hello, world');
    expect(functionsAnswers.functionFunction('Hai')('can i haz funxtion?')).to.eql('Hai, can i haz funxtion?');
  });

  it('you should be able to use closures', () => {
    const arr = [Math.random(), Math.random(), Math.random(), Math.random()];
    const square = function (x) { return x * x; };

    const funcs = functionsAnswers.makeClosures(arr, square);
    expect(funcs).to.have.length(arr.length);

    for (let i = 0; i < arr.length; i += 1) {
      expect(funcs[i]()).to.eql(square(arr[i]));
    }
  });

  it('you should be able to create a "partial" function', () => {
    const partial = functionsAnswers.partial(sayIt, 'Hello', 'Ellie');
    expect(partial('!!!')).to.eql('Hello, Ellie!!!');
    expect(sayItCalled).to.be.ok;
  });

  it('you should be able to use arguments', () => {
    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    const d = Math.random();

    expect(functionsAnswers.useArguments(a)).to.eql(a);
    expect(functionsAnswers.useArguments(a, b)).to.eql(a + b);
    expect(functionsAnswers.useArguments(a, b, c)).to.eql(a + b + c);
    expect(functionsAnswers.useArguments(a, b, c, d)).to.eql(a + b + c + d);
  });

  it('you should be able to apply functions with arbitrary numbers of arguments', () => {
    (function () {
      const a = Math.random();
      const b = Math.random();
      const c = Math.random();

      let wasITake2ArgumentsCalled = false;
      const iTake2Arguments = function (firstArgument, secondArgument) {
        expect(arguments.length).to.eql(2);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);

        wasITake2ArgumentsCalled = true;
      };

      let wasITake3ArgumentsCalled = false;
      const iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
        expect(arguments.length).to.eql(3);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);
        expect(thirdArgument).to.eql(c);

        wasITake3ArgumentsCalled = true;
      };

      functionsAnswers.callIt(iTake2Arguments, a, b);
      functionsAnswers.callIt(iTake3Arguments, a, b, c);

      expect(wasITake2ArgumentsCalled).to.be.ok;
      expect(wasITake3ArgumentsCalled).to.be.ok;
    }());
  });

  it('you should be able to create a "partial" function for variable number of applied arguments', () => {
    const partialMe = function (x, y, z) {
      return (x / y) * z;
    };

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    expect(functionsAnswers.partialUsingArguments(partialMe)(a, b, c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a)(b, c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a, b)(c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a, b, c)()).to.eql(partialMe(a, b, c));
  });

  it('you should be able to curry existing functions', () => {
    const curryMe = function (x, y, z) {
      return (x / y) * z;
    };

    const a = Math.random();
    const b = Math.random();
    const c = Math.random();
    let result;

    result = functionsAnswers.curryIt(curryMe);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = functionsAnswers.curryIt(curryMe)(a);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = functionsAnswers.curryIt(curryMe)(a)(b);
    expect(typeof result).to.eql('function');
    expect(result.length).to.eql(1);

    result = functionsAnswers.curryIt(curryMe)(a)(b)(c);
    expect(typeof result).to.eql('number');
    expect(result).to.eql(curryMe(a, b, c));
  });
});
