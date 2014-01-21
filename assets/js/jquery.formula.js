/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * This plugin provides formula computaion. And gives aggregate functions (sum, avg, max, min, count) to compute summary.
 * Use Case-
 * <input name="data[invoices][subtotal]" 
 formula="$('[name *= "sub_total"]').sum() + $('[name *= "tax_total"] ').value() - $('[name *=discount]').val()" >
 */

// Returns an array as formula splitted through (+,-,*,/)
function resolveOperators(formula) {
    var splitted_formula = [];
    formula = formula.replace(/ /g, '');
    var splitted_operator = formula.split(/[\+\-\*]?\$/g);
    for (var i = 0; i < splitted_operator.length; i++) {
        if (splitted_operator[i] != "") {
            splitted_formula.push('$' + splitted_operator[i]);
        }
    }
    return splitted_formula;
}

// Finds all the fields containing attribute 'formula' in form, finds the dependencies mentioned in formula and on change of any dependency it recomputes the formula
$.fn.compute = function(options) {
    var defaults = {};
    var settings = $.extend({}, defaults, options);
    $(this).each(function() {
        var isFormulaInitialize = $(this).attr('is_formula_initialize');
        if (typeof (isFormulaInitialize) == 'undefined' || isFormulaInitialize != 1) {
            var formula = $(this).attr('formula');
            $(this).attr('formula', formula.replace(/row/gi, '$(this).closest(".last-data-row")'));
            formula = formula.replace(/row/gi, '$(this).closest(".grid-template-row")');
            // Binding a custome event 'computeformula' to formula fields that will be fired when any of the formula dependency changes
            $(this).attr('is_formula_initialize', 1).bind("computeformula", function() {
                var val = 0;
                eval("val=" + $(this).attr('formula') + ";");
                $(this).val(val);
                $(this).trigger("change");
            });
            // Generating a key to be used as class to determine individual elements
            var key = $.uu();
            $(this).addClass(key);
            var className = 'trigger-formula-' + key;
             // Calculating dependencies for formula fields and attaching 'change' event to them
            var formulaDependencies = resolveOperators(formula);
            for (i = 0; i < formulaDependencies.length; i++) {
                var a = formulaDependencies[i].split('.');
                a.pop();
                a.push("addClass('" + className + "')");
                a = a.join('.');
                eval(a);
            }
            $(document).on('change', "." + className, function() {
                $('.' + key).trigger('computeformula');
            });
        }
    });
    return $(this);
};

// Returns parsefloat value of the field
$.fn.value = function() {
    if (typeof ($(this).val() != "undefined")) {
        if ($(this).val() == "") {
            return 0;
        } else if (!isNaN($.parseFloat($(this).val()))) {
            return $.parseFloat($(this).val());
        }
        return 0;
    }
};

// $(selector).sum() sums all the fields returned by selector
$.fn.sum = function() {
    var sum = 0;
    $(this).each(function() {
        sum += $(this).value();
    });
    return sum;
};

// $(selector).avg() returns average of all the fields returned by selector
$.fn.avg = function() {
    var length = $(this).length;
    if (length === 0) {
        return 0;
    } else {
        var sum = $(this).sum();
        return (sum / length);
    }
};

// $(selector).max() returns maximum value number amongst all the fields returned by selector
$.fn.max = function() {
    var length = $(this).length;
    if (length === 0) {
        return 0;
    } else {
        var max = 0;
        $(this).each(function() {
            max = max < $(this).value() ? $(this).value() : max;
        });
        return max;
    }
};

// $(selector).min() returns minimum value number amongst all the fields returned by selector
$.fn.min = function() {
    var min = 0;
    if ($(this).length > 0) {
        min = $(this).value();
        $(this).each(function() {
            min = ($(this).value() < min ? $(this).value() : min);
        });
    }
    return min;
};

// $(selector).count() returns number of fields returned by selector
$.fn.count = function() {
    return $(this).length;
};