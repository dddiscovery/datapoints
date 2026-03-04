---
layout: blog
title: "A Workflow for LLM-Augmented Codebook Generation"
subtitle: "combining manual curation with targeted LLM inference"
authors: ["[Yuxin Liang](https://www.linkedin.com/in/yuxinliang/)"]
author_pic: ["/assets/images/authors/YuxinL.jpeg"]
author_title: ["Data Scientist at DDDI"]
date: 2026-03-03
permalink: /llm-augmented-codebook/
summary: "A structured workflow for completing metadata without surrendering control."
---

Imagine you are a social science researcher. One day, you are excited to share a dataset you have collected/digitized/extracted/hand-coded with others in your field. Before doing so, however, you need to prepare a codebook for users who may lack the full research context. This step is particularly important in social science research, where data are often highly context-dependent. A well-prepared codebook explains the definition and source of each variable, provides sample values, and documents how missing values are coded—whether by you or by the original data provider.

This process can be tedious, especially when a dataset contains many variables drawn from multiple sources.

Large language models (LLMs) can serve as useful assistants in this context. However, just as a human researcher cannot reliably infer variable meanings solely from a dataset without sufficient background knowledge (such as the research domain or source documentation), we should not expect an LLM to do so either. Instead, LLMs are most effective when they are provided with structured context. In this post, I will introduce a workflow for using an LLM to assist with codebook generation when (1) an original codebook exists but provides incomplete information, and (2) additional contextual clues can be drawn from the data itself.

To demonstrate this approach, I use case-level data from the Executive Office for Immigration Review (EOIR), which I worked with as part of a Data Science for Social Good (DSSG) project ([learn more about DSSG here](http://datascience.sas.upenn.edu/programs/dssg/current-dssg-projects)). The goal is to show how an LLM can help generate a more complete codebook when the original documentation lacks key information such as variable definitions, sources, or data types.

<div class="workflow-scroll-panel">
<div class="workflow-chart">
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">EOIR Database</div>
        <ul class="workflow-list">
         <li>Case table</li>
         <li>Lookup tables</li>
         <li>Code key</li>
        </ul>
      </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Selected Dataset</div>
        <ul class="workflow-list">
         <li>3,180,981 records</li>
         <li>70 variables</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Data Preparation</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-column">
        <div class="workflow-step">
          <div class="workflow-step-title">Initial Codebook (Manual)</div>
          <ul class="workflow-list">
           <li><code>variable_name</code></li>
           <li><code>source_table</code></li>
           <li><code>description</code> (some missing)</li>
           <li><code>data_type</code> (some missing)</li>
           <li><code>sample_value</code></li>
           <li><code>na_value</code></li>
          </ul>
        </div>
        <div class="workflow-arrow">↓</div>
        <div class="workflow-step">
          <div class="workflow-step-title" style="color: #fc4357;">Missing metadata remains</div>
        </div>
      </div>
    </div>
    <div class="workflow-theme">Manual Baseline</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Inputs to LLM</div>
        <ul class="workflow-list">
         <li>SQL selection query</li>
         <li>First 200 dataset rows</li>
         <li>Existing code key</li>
         <li>Manual codebook</li>
         <li>Explicit DO NOT EDIT rules</li>
        </ul>
        </div>
      <div class="workflow-arrow">→</div>
      <div class="workflow-step">
        <div class="workflow-step-title">Prompted LLM Inference</div>
        <ol class="workflow-list">
         <li>Fill missing description</li>
         <li> Fill missing data_type</li>
         <li>Add <code>llm_flag</code></li>
         <li>Add <code>llm_explanation</code></li>
         <li>Preserve all non-missing values</li>
        </ol>
      </div>
    </div>
    <div class="workflow-theme">Structured LLM Assistance</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-column">
        <div class="workflow-step">
          <div class="workflow-step-title">LLM-Modified Codebook vs. Manual Codebook</div>
          <ul class="workflow-list">
            <li>Check column names match</li>
            <li>Check shape</li>
            <li>Identify rows with differences</li>
            <li>Confirm only NA fields were edited</li>
            <li>Count modified rows</li>
          </ul>
        </div>
        <div class="workflow-arrow">↓</div>
        <div class="workflow-step">
          <div class="workflow-step-title">Human Review of Flagged Rows</div>
          <ul class="workflow-list">
            <li>Evaluate inferred descriptions</li>
            <li>Verify inferred data types (if modified)</li>
            <li>Assess llm_explanation logic</li>
            <li>Approve or revise</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="workflow-theme">LLM-Augmented Codebook</div>
  </div>
  <div class="workflow-vertical-arrow" aria-hidden="true">↓</div>
  <div class="workflow-theme-box">
    <div class="workflow-row">
      <div class="workflow-step">
        <div class="workflow-step-title">Final Codebook</div>
        <ul class="workflow-list workflow-list-no-bullets">
          <li>Original metadata</li>
          <li>+ Completed descriptions</li>
          <li>+ Completed data types</li>
          <li>+ LLM flag</li>
          <li>+ Transparent reasoning column</li>
        </ul>
      </div>
    </div>
    <div class="workflow-theme">Final Codebook</div>
  </div>
</div>
</div>
<div class="workflow-caption">Figure 1: Workflow for LLM-Assisted Codebook Generation</div>

The EOIR case data are published by the U.S. Department of Justice’s ([EOIR Library](https://www.justice.gov/eoir/foia-library-0)) and contain records from U.S. immigration court proceedings. The database is organized into multiple tables, each corresponding to a distinct category of information. For example, the case table stores case identifiers and respondent demographic information, while the proceeding table records procedural details and adjudicative outcomes, such as hearing dates and immigration judges’ decisions. In addition to these core tables, the database includes several reference tables that store standardized codes—such as those for geographic locations, judges, and other entities—along with their corresponding full names. Although these reference tables function as lookup tables within the database, we treat them as codebooks in our workflow, as they map coded values (e.g., state abbreviations) to their human-readable meanings.

Because the dataset links demographic characteristics, legal charges, procedural histories, representation status, custody information, and judicial identifiers at the case level, it enables researchers to analyze patterns in immigration adjudication, including variation in removal and asylum outcomes, disparities across courts or judges, the effects of legal representation, and changes in enforcement and case processing over time.

The EOIR Library provides a data code key describing these tables and variables. However, this documentation has two major limitations: first, it was last updated in May 2019; second, it does not include descriptions for every variable present in the database. Given the size of the database, researchers typically extract only the variables relevant to their research questions to reduce computational costs and data-cleaning effort. In our case, we selected 70 variables from 13 tables. The resulting dataset contains 3,180,981 case-level records from 1990 onward and focuses on outcomes related to unauthorized entry, along with personal, migration, legal, criminal, bureaucratic, and judicial characteristics.

We performed data extraction using SQL queries. Based on these queries, we manually generated an initial codebook for the 70 selected variables using the existing EOIR data code key. This preliminary codebook contains one row per variable and includes the columns `variable_name`, `source_table`, `description`, `data_type`, `sample_value`, and `na_value` (shows how to code missing value in this variable). When information was missing from the original documentation, we left the corresponding fields blank.

Here is an example of the codebook structure:

<div class="table-scroll-3">
<table class="table-auto">
  <thead>
    <tr>
      <th>variable_name</th>
      <th>source_table</th>
      <th>description</th>
      <th>data_type</th>
      <th>sample_value</th>
      <th>na_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ALIEN_CITY</td>
      <td>Case</td>
      <td>Alien address city</td>
      <td>varchar(15)</td>
      <td>HIALEAH;LILLINGTON;HALLANDALE</td>
      <td>No NA</td>
    </tr>
    <tr>
      <td>CHG_STATUS</td>
      <td>ProceedCharges</td>
      <td>The decision/finding on the charge</td>
      <td>varchar(1)</td>
      <td>;S;S</td>
      <td>No NA</td>
    </tr>
    <tr>
      <td>BASE_STATE</td>
      <td>codebook_BaseCity</td>
      <td> </td>
      <td> </td>
      <td>NJ;NJ;NY</td>
      <td>None</td>
    </tr>
    <tr>
      <td>JUDGE_NAME</td>
      <td>LookupJudge</td>
      <td> </td>
      <td> </td>
      <td>all missing</td>
      <td>None</td>
    </tr>
    <tr>
      <td>attorney_flag</td>
      <td>DERIVED</td>
      <td> </td>
      <td> </td>
      <td>1;1;1</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <td>Nacara</td>
      <td>LookupAlienNat</td>
      <td> </td>
      <td> </td>
      <td>Y;Y;Y</td>
      <td>N</td>
    </tr>
  </tbody>
</table>
</div>
<div class="table-caption">Table 1: Sample Initial Codebook Schema (SQL Extract)</div>

We then designed an LLM prompt to assist with completing the codebook. Specifically, the LLM was instructed to:

(1) infer missing variable descriptions and data types using the existing codebooks, the code key, and the manually generated codebook, and the first 200 rows of the dataset;

(2) flag variables that require human review;

(3) provide a brief explanation of the reasoning behind any inferred information; and

(4) refrain from modifying any non-missing entries in the original codebook.

The intended outcome of the prompting process is for the LLM to extend the manually generated codebook by filling in previously missing values and adding two additional columns, `llm_flag` and `llm_explanation`.

We used the Claude Sonnet 4 model with a maximum token limit of 15,000. The results were encouraging. In the manual codebook, 19 variables were missing either a description, a data type, or both. Correspondingly, we observed 19 rows where the LLM-generated codebook differed from the manually generated version. After carefully reviewing these differences, we found that the LLM performed well in inferring variable definitions and data types by drawing on multiple sources of information, including variable name patterns, observed sample values, database lookup tables, and the logic embedded in the data extraction queries.

{% raw %}
````python
prompt = f""" 
I need you to generate a codebook from the dataset created from the following query:

SQL Query that creates the dataset:
```sql
{selection_query}
```

Dataset information (first 200 rows for context):
- Shape: {selected_case.head(200).shape}
- Columns: {selected_case.head(200).columns.tolist()}
- Data types: {selected_case.head(200).dtypes.to_dict()}
- Sample data (first 5 rows):
{selected_case.head(5).to_string()}

Existing codebooks in the project:
{codebooks}

Among these codebooks, "codebook_main" stores the variable sources (see the `Table` column) and definitions (see the `Definition` column) for most variables in the dataset.
The other codebooks contain information for specific codes or indices.
For example, "codebook_lang" stores the mapping between language codes (e.g., 'LANG' in "codebook_main", 'strCode' in "codebook_lang") and their corresponding language names (e.g., code MAJ indicates Mazatek).

Current codebook to edit:
{codebook_manual.to_string()}

TASK:
1. Review the provided "codebook_manual" DataFrame which contains existing variable metadata
2. Examine the first 200 rows of the dataset (selected_case) for context about the variables
3. Reference the existing codebook tables provided above (especially codebook_main)
4. ONLY edit cells that contain NA values in the `description` and `data_type` columns
5. Do NOT modify any other columns or any non-NA values


Column specifications:
- variable_name: The column name from the dataframe (should have 70 rows in this codebook since there are 70 variables in the dataframe) - DO NOT EDIT
- source_table: The table(s) from which this variable originates (based on the SQL query) - DO NOT EDIT
  Use the table names as they appear in the SQL query. In most cases, this corresponds to the `Table` column in "codebook_main".
  For example, according to "codebook_main", the variable 'NAT' comes from A_tblCase, but in the query, the dataset is referred to as Case.
  All table names in the query have had prefixes such as "tbl_", "A_", or "A_tbl" removed from the original codebook_main.
  Please cross-check and ensure that the table names match those used in the query. All table names are case-sensitive.
- description: ONLY fill in if currently NA - Match the `Definition` column in "codebook_main" exactly if it is available; if you need to make any changes (e.g., improving expression);
  if not, append a description inferred from the variable name or from similar variables.
  This should be a clear definition of what the variable represents.
- data_type: ONLY fill in if currently NA - Match the `Data Type` column in codebook_main exactly if it is not missing (possible values: "int", "varchar", "bit", "datetime", "char");
  if missing, infer the data type from the sample values.
- sample_value: Three non-NA samples (NA values can appear as "<NA>", "None", "N/A", "NaT", "M", "N", or "") from the dataframe, stored as a string separated by semicolons - DO NOT EDIT
  The values in this column should contain only valid entries or "all missing"; NA expressions should NOT appear here.
- na_value: The value that represents NA in the dataframe. It can be one of "<NA>", "None", "N/A", "NaT", "M", "N", or "" - DO NOT EDIT
  If there are no NA values in this variable, mark it as "No NA" or use another appropriate expression.
- llm_flag: NEW COLUMN to add - Mark as "yes: description" if you filled in description, "yes: data_type" if you filled in data_type,
  "yes: description; data_type" if you filled in both, or "no" if you made no changes to this row.

Important notes:
- Only edit NA values in `description` and `data_type` columns
- Preserve all existing non-NA values exactly as they are
- Use existing codebook tables for reference when filling in missing information
- The output should contain ALL columns from the input codebook_manual PLUS the new llm_flag column
- Cross-reference with "codebook_main" to ensure consistency where applicable

Add one more column: `llm_explanation`
- `llm_explanation`: If the LLM filled in description, data_type, or any other changed fields, provide a 1–2 sentence explanation of how the LLM inferred the value.
  - Explain which elements were used (e.g., variable-name patterns, sample values, suffix conventions, analogous variables in existing codebooks, SQL column names, or selection-query patterns—such as those used when creating new variables based on other variables—to infer the new variable according to the query logic and the definitions of related variables).
  - If the LLM did not modify this row (i.e., llm_flag = "no"), then set llm_explanation to an empty string "".

Return ONLY valid JSON array format with following format (the length of the array should be 70). No markdown, no explanations.
Example format:
[
  {{
    "variable_name": "IDNCASE",
    "source_table": "Case",
    "description": "The primary key for A_tblCase",
    "data_type": "int",
    "sample_value": "3630107; 3630108; 3630111",
    "na_value": "None",
    "llm_flag": "yes: description",
    "llm_explanation": " "
  }},
  ...
]

"""
````
{% endraw %}
<div class="block-caption">Example prompt</div>


For example, for the variable `JUDGE_NAME`, the LLM generated the definition "Name of the immigration judge", and provided the explanation "inferred from variable name pattern and relationship to judge information in LookupJudge table". Similarly, for the variable `attorney_flag`, which is a constructed variable and does not appear in the original database, the LLM defined it as :Binary indicator whether the alien has attorney representation", with the explanation "Inferred from CASE WHEN logic in SQL query that creates binary flag based on EOIRAttorneyID presence".

Notably, the LLM was also able to leverage domain knowledge beyond the database itself while remaining within the appropriate contextual scope. For instance, for the variable `Nacara`, the LLM assigned the description "NACARA eligibility indicator" and explained its reasoning as "Inferred from variable name 'Nacara' referring to the Nicaraguan Adjustment and Central American Relief Act and sample values showing Y/N indicators".

<div class="table-scroll-3 table-scroll-wide">
<table class="table-auto">
  <thead>
    <tr>
      <th>variable_name</th>
      <th>source_table</th>
      <th>description</th>
      <th>data_type</th>
      <th>sample_value</th>
      <th>na_value</th>
      <th>llm_flag</th>
      <th>llm_explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ALIEN_CITY</td>
      <td>Case</td>
      <td>Alien address city</td>
      <td>varchar(15)</td>
      <td>HIALEAH;LILLINGTON;HALLANDALE</td>
      <td>No NA</td>
      <td>no</td>
      <td> </td>
    </tr>
    <tr>
      <td>CHG_STATUS</td>
      <td>ProceedCharges</td>
      <td>The decision/finding on the charge</td>
      <td>varchar(1)</td>
      <td>;S;S</td>
      <td>No NA</td>
      <td>no</td>
      <td> </td>
    </tr>
    <tr>
      <td>BASE_STATE</td>
      <td>codebook_BaseCity</td>
      <td>Base city state code</td>
      <td>varchar</td>
      <td>NJ;NJ;NY</td>
      <td>None</td>
      <td>yes: description; data_type</td>
      <td>Inferred from variable name pattern and relationship to other address-related fields in codebook_BaseCity, with data type matching similar state code fields in the dataset.</td>
    </tr>
    <tr>
      <td>JUDGE_NAME</td>
      <td>LookupJudge</td>
      <td>Name of the immigration judge</td>
      <td>varchar</td>
      <td>all missing</td>
      <td>None</td>
      <td>yes: description; data_type</td>
      <td>Inferred from variable name pattern and relationship to judge information in LookupJudge table, with varchar data type for name fields.</td>
    </tr>
    <tr>
      <td>attorney_flag</td>
      <td>DERIVED</td>
      <td>Binary indicator whether the alien has attorney representation</td>
      <td>int</td>
      <td>1;1;1</td>
      <td>&lt;NA&gt;</td>
      <td>yes: description; data_type</td>
      <td>Inferred from CASE WHEN logic in SQL query that creates binary flag based on EOIRAttorneyID presence, with int data type matching the 0/1 values in the CASE statement.</td>
    </tr>
    <tr>
      <td>Nacara</td>
      <td>LookupAlienNat</td>
      <td>NACARA eligibility indicator</td>
      <td>varchar</td>
      <td>Y;Y;Y</td>
      <td>N</td>
      <td>yes: description; data_type</td>
      <td>Inferred from variable name 'Nacara' referring to the Nicaraguan Adjustment and Central American Relief Act and sample values showing Y/N indicators, with varchar data type for flag fields.</td>
    </tr>
  </tbody>
</table>
</div>
<div class="table-caption">Table 2: Sample LLM-Augmented Codebook </div>

We also tested the same prompt using OpenAI’s GPT-4o mini model, but the results were less satisfactory. In particular, the model modified a substantial amount of information that had been extracted from the original codebook, despite explicit instructions not to change any non-missing values in it.

Several key takeaways emerge from this exercise. First, it is critical to clearly specify what you want the LLM to do. In quantitative social science research, the initial step is often to make variables manipulable and measurable; this principle should also guide prompt design. Clearly enumerating the tasks the LLM is expected to perform, the information it is allowed to reference, and the desired structure of the output is essential for producing reliable and interpretable results.

Second, it is equally important to specify what the LLM should not modify, particularly when the task involves adding or refining information rather than rewriting existing content. We went through several prompt iterations before arriving at the final version. In earlier attempts, even when we instructed the model not to edit columns other than description and data_type, it still altered values in other non-missing columns based on its own internal judgment. Because these decisions are difficult to diagnose in a black-box model, we ultimately found that explicitly and repeatedly stating “DO NOT EDIT” immediately after the column specifications was an effective way to mitigate this issue.

In short, the motivation for this experiment was to avoid spending excessive time manually searching for variable definitions in the data code key and copying them one by one into a codebook. Our initial attempt—asking the LLM to generate a complete codebook from scratch using only the dataset and the code key—proved inefficient and required substantial manual verification. By contrast, combining a traditionally generated codebook with targeted LLM assistance to fill in missing descriptions and metadata appears to be a more practical and reliable approach. This workflow can help researchers, as well as those releasing data as a public good, save time while maintaining transparency and quality. We were encouraged by how well this approach worked in this case and look forward to further exploring how LLMs can contribute to social science research in the future.

<span style="color: #666666;">Check the full code for data extraction and codebook preparation ([here](https://colab.research.google.com/drive/1aZYhG3jpW7TokbfF7-d2wHZi07yhbvCg?usp=sharing)).</span>


