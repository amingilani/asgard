// test libraries
var mocha = require('mocha');
var should = require('should');
var request = require('require');

// localhost
var url = "http://localhost:3000/";

describe('Invoice API tests', function(){
  // level 1
  it('Should return "invoiceId", "amount", "wallet", "currency", and ' +
  '"rate" given "price", and "callback"', function(done){
    var bill = {
      price: 500,
      callback: "http://test.payload.pk"
    };
    request.post(url + 'invoice', bill, function(err, head, body) {
      body = JSON.parse(body);
      // requirements
      should.not.exist(err);
      head.status.should.be("200");
      should.exist(body.invoiceId);
      should.exist(body.amount);
      should.exist(body.address);
      should.exist(body.currency);
      body.curency.should.equal('PKR');
      should.exist(body.rate);
      done();
    });
  });

  // level 2
  it('Should get all invoices', function(){

  });
});
