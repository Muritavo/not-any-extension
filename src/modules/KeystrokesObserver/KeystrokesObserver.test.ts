import KeystrokesObserver from ".";

it.each([": any", ":any", "something:any", ":  any"])(
  "Should dispatch onany event when the user writes :any (ex: '%s')",
  (example) => {
    const cb = jest.fn();
    const I = new KeystrokesObserver();
    I.on("any", cb);
    example.split("").forEach((a) => I.onKey(a));
    expect(cb).toHaveBeenCalledTimes(1);
  }
);
