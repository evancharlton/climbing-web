import React from 'react';

function Chart({data}) {
  var grades = [];
  data.map(t => {
    var d = grades.filter(val => {return val.gradeNumber===t.gradeNumber})
    if (!d[0]) {
      grades.push({gradeNumber: t.gradeNumber, grade: t.grade, fa: (t.fa? 1 : 0), tick: (t.fa? 0 : 1)});
    } else {
      if (t.fa) {
        d[0].fa++;
      } else {
        d[0].tick++;
      }
    }
  });
  grades.sort((a,b) => {return b.gradeNumber-a.gradeNumber});
  const maxValue = Math.max.apply(Math, grades.map(d => {return d.fa+d.tick}));
  const rows = grades.map((g, i) => {
    const faWidth = (g.fa/maxValue*100) + '%';
    const tickWidth = (g.tick/maxValue*100) + '%';
    return (
      <tr key={i}>
        <td style={{padding: 0, textAlign: 'center', whiteSpace: 'nowrap'}}>{g.grade}</td>
        <td style={{padding: 0, textAlign: 'center'}}>{g.fa}</td>
        <td style={{padding: 0, textAlign: 'center'}}>{g.tick}</td>
        <td style={{padding: 0, textAlign: 'center'}}><strong>{g.fa+g.tick}</strong></td>
        <td style={{width: '100%', verticalAlign: 'middle'}}>
          <div style={{width: faWidth, height: '10px', backgroundColor: '#3182bd', float: 'left'}}></div>
          <div style={{width: tickWidth, height: '10px', backgroundColor: '#6baed6', marginLeft: faWidth}}></div>
        </td>
      </tr>
    )
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Grade</th>
          <th>FA</th>
          <th>Tick</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default React.memo(Chart)