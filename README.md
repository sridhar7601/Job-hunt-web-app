# React + TypeScript + Vite
### Screenshot of UI 

### Steps to run the repository locally
<img width="1280" alt="Screenshot 2024-05-06 at 9 56 20 AM" src="https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/c30495f4-ba77-4188-a583-95f96dc31717">
<img width="1280" alt="Screenshot 2024-05-06 at 9 56 49 AM" src="https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/bcb37812-917a-4aa9-9661-9cdabd05e8bc">


https://github.com/sridhar7601/job-hunt-web-app/assets/56919037/069e8709-3c49-41d0-aaf8-a1aa8a138a03


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
