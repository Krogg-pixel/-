function chinese_to_arabic(chinese_num) {
    var chinese_nums = {
        "一": 1, "二": 2, "三": 3, "四": 4, "五": 5,
        "六": 6, "七": 7, "八": 8, "九": 9, "十": 10,
        "廿": 20, "卅": 30
    };

    var num = 0;
    var unit = 0;
    for (var i = 0; i < chinese_num.length; i++) {
        var char = chinese_num[i];
        if (char in chinese_nums) {
            if (chinese_nums[char] === 10) {  // 处理十位数
                if (unit === 0) {
                    unit = 10;
                } else {
                    num += unit * 10;
                    unit = 0;
                }
            } else if (chinese_nums[char] === 20) {  // 处理廿位数
                if (unit === 0) {
                    unit = 20;
                } else {
                    num += unit * 10;
                    unit = 0;
                }
            } else if (chinese_nums[char] === 30) {  // 处理卅位数
                if (unit === 0) {
                    unit = 30;
                } else {
                    num += unit * 10;
                    unit = 0;
                }
            } else {
                unit = chinese_nums[char];
            }
        } else {
            num = num * 10 + unit;
            unit = 0;
        }
    }

    num += unit;
    return num;
}

function lunar_month_to_number(month) {
    var lunar_month_mapping = {
        "正": 1, "二": 2, "三": 3, "四": 4, "五": 5,
        "六": 6, "七": 7, "八": 8, "九": 9, "十": 10,
        "冬": 11, "腊": 12
    };
    return lunar_month_mapping[month];
}

function get_current_time() {
    return new Date();
}

function get_value_c(current_time) {
    var hour = current_time.getHours();
    return Math.floor((hour + 1) / 2) + 5;
}

function calculate_value_d(value_a, value_b, value_c) {
    return (value_a - 1 + value_b - 1 + value_c) % 6;
}

function interpret_value_d(value_d) {
    var interpretations = {
        1: "大安", 2: "留连", 3: "速喜",
        4: "赤口", 5: "小吉", 0: "空忙" // Note: 0 corresponds to "空忙" instead of 6
    };
    return interpretations[value_d];
}

function interpretDate() {
    var question = "今天是农历几月几？";
    var user_answer = document.getElementById("lunar_date").value;

    var date_parts = user_answer.split("月");
    var month_part = date_parts[0];
    var day_part = date_parts[1];

    var month_number = lunar_month_to_number(month_part);

    var day_number;
    if (day_part.startsWith("初")) {
        day_number = chinese_to_arabic(day_part.substring(1));
    } else if (day_part.startsWith("十")) {
        day_number = 10 + chinese_to_arabic(day_part.substring(1));
    } else if (day_part.startsWith("廿")) {
        day_number = 20 + chinese_to_arabic(day_part.substring(1));
    } else {
        day_number = chinese_to_arabic(day_part);
    }

    var current_time = get_current_time();
    var value_c = get_value_c(current_time);

    var value_d = calculate_value_d(month_number, day_number, value_c);

    var result = interpret_value_d(value_d);
    document.getElementById("result").innerText = "解释结果：" + result;
}
