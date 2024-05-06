# React + TypeScript + Vite
### Screenshot of UI 

### Steps to run the repository locally
![normalimg](https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/479247c0-24e2-4562-bdc1-978a72fb9fa8)
![searchimg](https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/f04c75d4-7a0e-43de-bd7b-f3094cd37a88)



https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/bab44cc1-9d85-420e-87fc-f280f95f8bc9


1. Clone the repository to your local machine :
```bash
 git clone https://github.com/sridhar7601/job-hunt-web-app.git
```
2. Navigate to the file and install the necessary files :
```bash
cd job-hunt-web-app && npm i
```
3. Start local server :
```bash
npm run dev
```
#Problems Faced 
### Reconciliation

Reconciliation is the process React uses to efficiently update the UI based on changes to the component tree. It ensures that only the necessary changes are made to the DOM, improving performance by avoiding unnecessary re-renders.
I've tried to solve the major issues created while doing 

### Improvement
Still, a few areas to be addressed such as implementing lazy loading and usememo or usecallback for memorization and unnecessary re-renders and usage of polyfills may work across all browser
As I'm in the phase of learning all these I will try to implement all ASAP 

### Task covered 
1. Job Cards: Each job listing should be displayed as a card containing the following information:
Job title
Company name
Location
Job description (limited to a certain number of characters with an option to expand)
Experience required
Apply button/link
2. Filters: Implement filters to allow users to refine the job listings based on:
Min experience
Company name
Location
Remote/on-site
Tech stack
Role
Min base pay
3. Infinite Scroll
4. Responsive Design
