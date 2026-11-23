const http = require('http');

async function testEndpoints() {
  const tests = [
    { method: 'GET', path: '/api/health' },
    { method: 'GET', path: '/api/dashboard' },
    { method: 'GET', path: '/api/curriculum?level=jlpt_n2' },
    { method: 'GET', path: '/api/srs/queue' },
    { method: 'GET', path: '/api/kanji' },
    { method: 'GET', path: '/api/analytics' },
    {
      method: 'POST',
      path: '/api/studio/writing/evaluate',
      body: JSON.stringify({
        taskType: 2,
        essayText: 'In recent years, the question of whether tertiary education should be fully funded by governments has generated considerable debate. Proponents argue that unrestricted access to higher learning fosters social mobility and bolsters economic innovation. However, opponents contend that the fiscal burden on public finances is unsustainable. In my view, while universal access is ideal, a hybrid cost-sharing model represents a more viable solution. To begin with, providing free university education democratizes professional opportunities, breaking generational poverty cycles. Furthermore, highly skilled graduates drive technological advancement and higher tax revenues. Nevertheless, government budgets are finite. When tuition is entirely subsidized, educational institutions frequently suffer from underfunding, compromising pedagogical quality and research facilities. In conclusion, tuition fees should be subsidized according to socioeconomic need rather than eliminated entirely.'
      })
    }
  ];

  let passCount = 0;
  let failCount = 0;

  for (const t of tests) {
    try {
      const res = await fetch(`http://localhost:5000${t.path}`, {
        method: t.method,
        headers: t.body ? { 'Content-Type': 'application/json' } : {},
        body: t.body
      });
      const data = await res.json();
      if (res.ok) {
        passCount++;
        console.log(`PASS: ${t.method} ${t.path} [Status ${res.status}]`);
        if (t.path.includes('evaluate')) {
          console.log('Writing evaluation result:', {
            overallBand: data.overallBand,
            criterionScores: data.criterionScores,
            wordCount: data.wordCount,
            feedbackSnippet: data.feedback ? data.feedback.slice(0, 2) : []
          });
        }
      } else {
        failCount++;
        console.error(`FAIL: ${t.method} ${t.path} [Status ${res.status}]:`, data);
      }
    } catch (e) {
      failCount++;
      console.error(`FAIL: ${t.method} ${t.path} Exception:`, e.message);
    }
  }

  console.log(`\nEndpoint Tests Summary: ${passCount} passed, ${failCount} failed.`);
}

testEndpoints();
