import { ReversePipe } from "./reverse.pipe";


describe('Rverse Pipe', () => {
  it('should create the app', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  })
});
