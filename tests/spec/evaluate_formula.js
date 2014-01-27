describe("Testing formula evaluation", function() {
    it("Testing formula=\"$('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100)+(($('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100))*$('#tax').value()/100)\"", function() {
        $('#form1').find('[formula]').compute();
        $('#qty').trigger('change');
        expect($('#total').value()).toEqual(4892.5);
    });
    it("Testing formula=\"((100+250)*4-(50-20))/6\"", function() {
        $('#form2').find('[formula]').compute();
        $('#form2-qty').trigger('change');
        expect($('#form2-total').value()).toEqual(350);
    });
    it("Testing formula=\"$('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100)+(($('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100))*$('#tax').value()/100)-70\"", function() {
        $('#form3').find('[formula]').compute();
        $('#form3-qty').trigger('change');
        expect($('#form3-total').value()).toEqual(4822.5);
    });
    it("Testing formula=\"70+$('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100)+(($('#qty').value()*$('#pu').value()-($('#qty').value()*$('#pu').value()*$('#disc').value()/100))*$('#tax').value()/100)\"", function() {
        $('#form4').find('[formula]').compute();
        $('#form4-qty').trigger('change');
        expect($('#form4-total').value()).toEqual(4822.5);
    });
});