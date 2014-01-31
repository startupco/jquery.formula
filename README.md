jquery.formula version 2
========================

This plugin provides mathematical computations for complex expressions

#### Introduction:

This plugin provides formula computation on a DOM field. It Keeps watching, if any of the field (included in formula) changes it re-computes the formula.

#### Uses:

To use this plugin, an attribute ```formula``` need to be associated with the field on which the formula need to be computed.

###### example:

```html
<input type="text" placeholder="Auto-populated as formula" formula="$('#qty').value()*$('[name="pu"]').value()+$('#tax').value()-$('.disc').value()">
```

#### Formula construct:

It can have complex jquery selectors like-

```javascript
formula="$('#qty').value()*$('[name="pine"]').value()+$('.tax').value()-$('#disc').value()"
```

#####  ***For Grids***

  - Row wise computation:

    use ```row``` keyword to specify the current row. This plugin replaces ```row``` with ```$(this).closest(".last-data-row")```. So you have to have ```last-data-row``` class associated with each row.
     It can be written like-

```Javascript
formula="row.find('[name*="quantity"]').value()*row.find('[name*="price_per_unit"]').value()"
```

  - Column wise computation:

   For column wise computation this plugin uses aggregate functions like- sum, max, min, avg, count

###### Examples:

```javascript
    formula="$('[name *= "tax_total"]').sum()"
    formula="$('[name *= "tax_total"]').max()"
    formula="$('[name *= "tax_total"]').min()"
    formula="$('[name *= "tax_total"]').count()"
    formula="$('[name *= "tax_total"]').avg()"
```
    
#### API:

###### compute:

This function provides formula computation on the field(must have attribute ```formula```) on which it is fired. example-
```
$('container').find('[formula]').compute();
```
The formula will be recomputed if any formula dependency changes.

###### value:
 It is a wrapper on top of ```$.val()```, it takes care of ```NaN, undefined, ""``` and parses the value in Float.

###### sum:
It loops over all the matched elements and returns their aggregated sum.

###### min:
It loops over all the matched elements and returns the minimum value number.

###### max:
It loops over all the matched elements and returns the maximum value number.

###### avg:
It returns the average of all matched element values.
