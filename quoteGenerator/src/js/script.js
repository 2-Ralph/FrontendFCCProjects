const quotes = [
    {
        author: 'William Shakespeare',
        quote: "To be or not to be. That is the question."
    },
    {
        author: 'Unknown',
        quote: "Shoot for the moon! Even if you miss, you'll land among the stars."
    },
    {
        author: 'The Big Short',
        quote: 'You just bet against the american economy'
    },
    {
        author: 'Unknown',
        quote: 'Roses are red, violets are blue, there is always an asian better than you'
    },
    {
        author: 'Spiderman',
        quote: "With great power comes great responsibility"
    },
    {
        author: 'Rob Lowe',
        quote: 'I take care of my body above all else. Training, diet, exercise, positive thinking. Scientists belive that the first person to live 150 years has already been born. I believe I am that human being.'
    },
    {
        author: 'Bo Burnham',
        quote: "Could I interest you in everything all of the time? A little everything all of the time? Apathy's a tradegy and boredom is a crime. A little everything all of the time."
    },
    {
        author: 'Beth Harmon',
        quote: "Chess can also be beautiful. An entire world of just 64 squares."
    },
    {
        author: 'Levy Rozman',
        quote: "What's worth more than a queen? You. You're worth more than a queen. You're absolutely amazing! But more importantly..."
    },
    {
        author: 'Hikaru Nakamura',
        quote: "Come on! This is a draw. I mean it's fine! He can take that! I literally don't even care, cause' I offered him a draw and he didn't take it. It's fine though. I literally don't care. I literally don't."
    }
];

function loadNewQuote(){
    const randomQuoteObj = quotes[Math.ceil(Math.random() * quotes.length - 1)];
    const randomQuote = randomQuoteObj.quote;
    const randomAuthor = randomQuoteObj.author;

    $(".text").html(randomQuote);
    $(".author").html("- " + randomAuthor);

    $("#tweet-quote").attr('href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + randomQuote + '" \n- ' + randomAuthor));
};

$(document).ready(loadNewQuote)
