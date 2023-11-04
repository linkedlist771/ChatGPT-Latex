# ChatGPT-Latex
This project aims to implement the functionality that interact with the LaTex when using ChatGPT.  

1. Convert the formula sign.
> The ChatGPT web version will conver the $ into \( and \) and $$ into \[  \] for convenience, 
> but we need to transform it back when using the `Typroa`(such markdown render).
**Step**:
- Find the copy button in each response.
- Inject the copy button (how? change its copy logic change its output).
- Finished.