let t = 'generated nearly $30 billion globally in 2019. Cost is $200,000. Math is $2x + 5 = 10$ and $5$ or $10$.';
t = t.replace(/\$([0-9]{1,3}(?:,[0-9]{3})+(?:\.[0-9]+)?)(?!\s*[+\-*/=^_\\])/g, '&#36;$1');
t = t.replace(/\$([0-9]+(?:\.[0-9]+)?\s+(?:million|billion|trillion|thousand|hundred))\b/gi, '&#36;$1');
console.log(t);
