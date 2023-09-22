
const {adjustFrame} = require("../public/utils/utils")


describe("adjust frame",()=>{

    it("adjust frame",()=>{
        expect(adjustFrame(1000,1200)).toEqual([576,960])
    })
  
})