// import { example } from './example';
import './scss/main.scss';
import $ from 'jquery';

$(document).ready(function() {
  //get form submit button
  $('form').submit((event) => {
    event.preventDefault();
    let input1 = $('#input-1').val();
    let input2 = $('#input-2').val();

    //print to DOM
    $('.output').html(input1 + ' ' + input2);
  });
});
