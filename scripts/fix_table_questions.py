import json
import re

master_path = r"C:\dev\vespera\scripts\exported_all_questions.json"
with open(master_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

# Table for cb_38e79659
table_38e79659 = """### Attendance and Cost of Hosting for Past Four US World’s Fairs

| World’s fairs held in the US | Cost (in US dollars) | Number of visitors |
| :--- | :---: | :---: |
| Century 21 Exposition (1962) | \\$47 million | 9.60 million |
| HemisFair ’68 | \\$156 million | 6.40 million |
| 1984 World’s Fair | \\$350 million | 7.35 million |
| Expo ’74 | \\$78 million | 5.60 million |

Huge international exhibitions known as world’s fairs have been held since 1851, but the United States hasn’t hosted one since 1984. Architecture expert Mina Chow argues that this is because some people think the events are too expensive and not popular enough. For example, the 1984 World’s Fair cost \\$350 million and had only ______

Which choice most effectively uses data from the table to complete the example?"""

# Table for cb_4042ff0b
table_4042ff0b = """### Comfort Ratings and Temperature-Adjustment Preferences from One Survey

| Participant | Comfort rating | Preferred temperature adjustment |
| :---: | :---: | :---: |
| 20 | −2 | Cooler |
| 1 | 1 | Cooler |
| 21 | 1 | Cooler |

Nan Gao and her team conducted multiple surveys to determine participants’ levels of comfort in a room where the temperature was regulated by a commercial climate control system. Participants filled out surveys several times a day to indicate their level of comfort on a scale from −3 (very cold) to +3 (very hot), with 0 indicating neutral (neither warm nor cool), and to indicate how they would prefer the temperature to be adjusted. The table shows three participants’ responses in one of the surveys. According to the table, all three participants wanted the room to be cooler, ______

Which choice most effectively uses data from the table to complete the statement?"""

updated_count = 0
for q in questions:
    if q["id"] == "cb_38e79659":
        q["prompt"] = table_38e79659
        updated_count += 1
    elif q["id"] == "cb_4042ff0b":
        q["prompt"] = table_4042ff0b
        updated_count += 1

with open(master_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"Updated {updated_count} questions in {master_path}!")
