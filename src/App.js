import React, { useState } from 'react'
import './App.css';

export const App = (props) => {

  const [value, setValue] = useState('');
  const [mentions, setMentions] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
 
  function handleOK()
  {
    let input = value;
    let mention_pattern = /\B@[a-z0-9_-]+/gi;
    let week_pattern = value.match(/\b((mon|Mon|tues|Tues|wed(nes)?|Wed(nes)?|thur(s)?|Thur(s)?|fri|Fri|sat(ur)?|Sat(ur)?|sun|Sun)(day)?)\b/g)
    let date_pattern = value.match(/\d{1}([\/.-])\d{2}\1\d{4}/g);
    let date_pattern1 = value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);

    let time_pattern = value.match(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/);
    let time_pattern2 = value.match(/\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)/);

    let time_of_day = value.search("noon");

    console.log('timeofday' +time_of_day)
    
    
    let word_pattern = value.match(/Tomorrow/)
    if(word_pattern)
    {
      const today = new Date()
      const tomorrow = new Date(today + 1)
      var myDate =  new Date(tomorrow.setDate(tomorrow.getDate() + 1))
      setDate(myDate.toISOString())
    }
    if(time_pattern)
    {
      const myDate = new Date()
      setDate(myDate.toISOString())
    }
    if(week_pattern)
    {
      let new_val =  nextDate(week_pattern[0])
      const myDate = new Date(new_val)
      setDate(myDate.toISOString())
    }
    if(time_of_day && week_pattern)
    {
      
      let new_val =  nextDate(week_pattern[0])
      const myDate = new Date(new_val)
      let t = myDate.setHours(17);
      let d = new Date(t);
      setDate(d.toISOString())
    }

    console.log("Time", time_pattern)
    
    let mentions = value.match(mention_pattern);
    setMentions(mentions);
    if(date_pattern)
    {
      var myDate = new Date(date_pattern[0]);
      setDate(myDate.toISOString())
    }
    if(date_pattern1)
    {
      var myDate = new Date(date_pattern1[0]);
      setDate(myDate.toISOString())
    }
    if(mention_pattern)
    {
      input = input.replace(mention_pattern, "")
    }

    if(date_pattern)
    {
      input = input.replace(date_pattern, "")
    }
  
    if(week_pattern)
    {
      input = input.replace(week_pattern, "")
    }
   
    if(time_pattern)
    {
      input = input.replace(time_pattern[0], "")
    }

    if(word_pattern)
    {
      input = input.replace(word_pattern[0], "")
    }

    // input = input.replace('at', "")
    // input = input.replace('-', "")
    // input = input.replace('and', "")
    // input = input.replace('with', "")
    // input = input.replace('Noon', "")
    // input = input.replace(',', "")

    var text = input;
    var find = ["Noon","and", 'at','with', '-', ',' ];
    var replace = ['','', '','','',''];
    input = replaceStr(text, find, replace);

    setText(input);
  }
  function replaceStr(str, find, replace) {
      for (var i = 0; i < find.length; i++) {
          str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
      }
      return str;
  }
  function nextDate(day) {
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var today = new Date();
      var today_day = today.getDay();

      day = day.toLowerCase();

      for (var i = 7; i--;) {
          if (day === days[i]) {
              day = (i <= today_day) ? (i + 7) : i;
              break;
          }
      }

      var daysUntilNext = day - today_day;

      return new Date().setDate(today.getDate() + daysUntilNext);

  }
  function handleChange(e) {
    const { value } = e.target;
    setValue(value);
}
  // const [mentions, setMentions] = useState('');
 
  return (
        <div className="App">
          <header className="App-header">
              <div className="app-wrapper">
                <form action="" className="myForm">
                {/* <p className="">Test Task</p> */}

                 <div className="form-inner">
                 <label>
                    <p className="label-txt label-active">ENTER STRING</p>
                    <input type="text" className="input" value={value} onChange={handleChange}/>
                   
                    <div className="line-box">
                      <div className="line"></div>
                    </div>
                  </label>
                  <button type="button" onClick={handleOK}>submit</button>
                  {
                    (mentions && date || text) &&
                    <div className="details">
                       <p className="">RESULT</p>
                      <ul>
                        <li><strong>DateTime:</strong>{date}</li>
                        <li><strong>Body:</strong>{text}</li>
                        {
                          mentions && mentions.length > 0 &&
                          <li><strong>Mentions:</strong>[{mentions.map((mention, key) =>
                          <span key={key}>'{mention}' {((key + 1) < mentions.length) ? ',' : ''}</span>
                          )}]</li>
                        }

                      </ul>
                    </div>
                  }
                 </div>
                </form>
              </div>
          </header>
        </div>
  )}

export default App;
