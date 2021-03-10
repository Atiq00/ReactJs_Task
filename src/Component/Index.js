import React, { useState } from 'react'
import InputString from './InputString'
import MentionBody from './MentionBody'
import moment from 'moment'
import InputButton from './InputButton';
export const Index = (props) => {

    const [value, setValue] = useState('');
    const [mentions, setMentions] = useState([]);
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    function handleOK() {
        let input = value;
        let mention_pattern = /\B@[a-z0-9_-]+/gi;
        let week_pattern = value.match(/\b((mon|Mon|tues|Tues|wed(nes)?|Wed(nes)?|thur(s)?|Thur(s)?|fri|Fri|sat(ur)?|Sat(ur)?|sun|Sun)(day)?)\b/g)
        let date_pattern = value.match(/\d{1}([\/.-])\d{2}\1\d{4}/g);
        let date_pattern1 = value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);

        let time_pattern = value.match(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/);
        let time_pattern2 = value.match(/\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)/);

        let time_of_day = value.search("noon");


        let word_pattern = value.match(/Tomorrow/)
        if (word_pattern) {
            const today = moment();
            const tomorrow = moment(today, "DD-MM-YYYY").add(1, 'days');
            var myDate = moment(tomorrow).toISOString()
            setDate(myDate)
        }
        if (time_pattern) {
            console.log("time pattern" + time_pattern[0])
            // const myDate1 =  myDate.add(5, 'hours');
            // setDate(myDate1.toISOString())
        }
        if (week_pattern) {
            let new_val = nextDate(week_pattern[0])
            const myDate = new Date(new_val)
            setDate(myDate.toISOString())
        }
        if (time_of_day && week_pattern) {

            let new_val = nextDate(week_pattern[0])
            const myDate = new Date(new_val)
            let t = myDate.setHours(17);
            let d = new Date(t);
            setDate(d.toISOString())
        }


        let mentions = value.match(mention_pattern);
        setMentions(mentions);
        if (date_pattern) {
            var myDate = new Date(date_pattern[0]);
            setDate(myDate.toISOString())
        }
        if (date_pattern1) {
            var myDate = new Date(date_pattern1[0]);
            setDate(myDate.toISOString())
        }
        if (mention_pattern) {
            input = input.replace(mention_pattern, "")
        }

        if (date_pattern) {
            input = input.replace(date_pattern, "")
        }

        if (week_pattern) {
            input = input.replace(week_pattern, "")
        }

        if (time_pattern) {
            input = input.replace(time_pattern[0], "")
        }

        if (word_pattern) {
            input = input.replace(word_pattern[0], "")
        }


        var text = input;
        var find = ["Noon", "morning", "and", 'at', 'with', '-', ','];
        var replace = ['', '', '', '', '', '', ''];
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
    return (
        <div className="App h-screen w-full flex justify-center items-center bg-green-500">
            <header className="App-header bg-white shadow-md rounded px-8 py-8 pt-8">
                <div className="app-wrapper">
                    <form action="" className="myForm w-full bg-gray-200 pt-12 pb-4 pr-5 pl-5">
                        <div className="form-inner">
                            <label className="block relative m-10">
                                <p className="label-txt text-black l-top-1 text-sm block font-bold pb-2">ENTER STRING</p>
                                <InputString handleChange={handleChange} value={value} />
                                <div className="line-box relative w-full">
                                    <div className="line"></div>
                                </div>
                            </label>
                            <InputButton handleOK={handleOK} />
                            {
                                (mentions && date || text) &&
                                <MentionBody date={date} text={text} mentions={mentions} />

                            }
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
}

export default Index;
