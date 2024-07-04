const element = document.getElementById("fx-code-layer-1");
const lines = [
"import 'package:edu_prof_app_flutter/adapters/SkillAdapter.dart';\n",
"import 'package:edu_prof_app_flutter/models/Skill.dart';\n",
"import 'package:edu_prof_app_flutter/templates/CustomSearchBar.dart';\n",
"import 'package:edu_prof_app_flutter/templates/WideTemplate.dart';\n",
"import 'package:flutter/material.dart';\n",
"\n",
"class SkillViewHolder extends StatefulWidget {\n",
"  const SkillViewHolder({super.key, required this.listDispatcher});\n",
"\n",
"  final Future<List<Skill>> listDispatcher;\n",
"\n",
"  @override\n",
"  State<SkillViewHolder> createState() => _SkillViewHolderState();\n",
"}\n",
"\n",
"class _SkillViewHolderState extends State<SkillViewHolder> {\n",
"  late Future<List<Skill>> _filteredSkills;\n",
"  late TextEditingController _searchController;\n",
"\n",
"  @override\n",
"  void initState() {\n",
"    super.initState();\n",
"    _filteredSkills = widget.listDispatcher;\n",
"    _searchController = TextEditingController();\n",
"  }\n",
"\n",
"  void _performSearch(String query) {\n",
"    setState(() {\n",
"      _filteredSkills = widget.listDispatcher.then((skills) {\n",
"        return skills.where((skill) => ;${skill.title} ${skill.searchtag};\n",
"            .toLowerCase()\n",
"            .contains(query.toLowerCase()));\n",
"      }).then((filteredSkills) => filteredSkills.toList());\n",
"    });\n",
"  }\n",
"\n",
"  @override\n",
"  Widget build(BuildContext context) {\n",
"    return WideTemplate(\n",
"      headFixed: CustomSearchBar(\n",
"        controller: _searchController,\n",
"        onTextChanged: _performSearch,\n",
"      ),\n",
"      body: FutureBuilder(\n",
"        future: _filteredSkills,\n",
"        builder: (context, snapshot) {\n",
"          if (snapshot.connectionState == ConnectionState.waiting) {\n",
"            return const Center(child: CircularProgressIndicator());\n",
"          } else if (snapshot.hasError) {\n",
"            return const Center(child: Text('Что то пошло не так ...'));\n",
"          } else if (snapshot.hasData) {\n",
"            return Column(\n",
"              children: snapshot.data!.isNotEmpty\n",
"                  ? snapshot.data!\n",
"                      .map((item) => SkillAdapter(\n",
"                            skill: item,\n",
"                          ))\n",
"                      .toList()\n",
"                  : const [\n",
"                      Center(\n",
"                          child: Icon(\n",
"                        Icons.sentiment_dissatisfied,\n",
"                        color: Colors.black38,\n",
"                        size: 40,\n",
"                      )),\n",
"                      Center(\n",
"                          child: Text(\n",
"                        'По вашему запросу \nничего не нашлось ...'',\n",
"                        style: TextStyle(color: Colors.black38, fontSize: 22),\n",
"                      )),\n",
"                    ],\n",
"            );\n",
"          } else {\n",
"            return const Center(child: Text('Что то пошло не так ...'));\n",
"          }\n",
"        },\n",
"      ),\n",
"    );\n",
"  }\n",
"\n}"

];

let op = [];

let currentLineIndex = 0;
let currentCharIndex = 0;


function animateTerminal() {
    const currentLine = lines[(currentLineIndex + 1) % lines.length];
    const textSoFar = currentLine.substr(0, currentCharIndex);
    op[currentLineIndex] = textSoFar;

    element.textContent = op.join("");

    if (currentCharIndex < currentLine.length) {
        currentCharIndex++;
    } else {
        currentCharIndex = 0;
        currentLineIndex = currentLineIndex + 1;
        if (currentLineIndex >= 6) {
            delete op[currentLineIndex-6]
        }
    }

}

setInterval(animateTerminal, 50);
