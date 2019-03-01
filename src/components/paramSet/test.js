pm.expect(
  packages.every(p => {
    storedPackages.some(stored => stored === p.name);
  })
).to.be.true;
