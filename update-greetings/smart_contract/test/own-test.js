const { expect } = require('chai');
const { ethers } = require('hardhat');


describe("Greeter Contract", function () {

  let Greeter;
  let greeter;
  const initialGreetings = "Hello from Kris!";

  beforeEach(async function () {
    Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy("Hello from Kris!");
    await greeter.deployed();
  });

  describe("Deployment", function () {
    it("Should Deploy and set greetings", async function () {
      expect(await greeter.greet()).to.equal("Hello from Kris!");
    });
  });

  describe("Change Greetings", function () {
    it("Should Set new greetings", async function () {
      await greeter.setGreeting("Hello from Krisek!");
      expect(await greeter.greet()).to.equal("Hello from Krisek!");
    })
  })

})