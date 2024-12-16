---
description: Web frameworks vs online web building services
---

# C-GPT - Svelte vs Framer

what are the pros and cons of building a complex web3 (sui) app using expert knoweldge of Svelte vs an online service specifically framer.com?

**ChatGPT said:**

ChatGPT

When deciding whether to use **Svelte** (leveraging your expertise) or a no-code/low-code service like **Framer** for building a complex Web3 (Sui) app, it’s important to evaluate both options based on your project goals, technical requirements, and long-term scalability. Here's a breakdown:

***

#### **Using Svelte (Expert Knowledge)**

**Pros:**

1. **Full Control**
   * You have complete control over the codebase, allowing for highly customized features and integrations.
   * You can tailor the app's performance, optimize interactions, and build bespoke functionality for Sui.
2. **Flexibility**
   * Svelte offers exceptional flexibility to create a responsive, dynamic interface optimized for Web3-specific features like wallet integrations, blockchain transactions, and real-time updates.
   * Easy to integrate with Web3 libraries like ethers.js, sui.js, or wallet connectors.
3. **Scalability**
   * A custom codebase can grow with the app, making it easier to add new features like DAO voting, smart contract interactions, or complex animations.
   * You can modularize the code for future updates or collaboration with other developers.
4. **Ownership**
   * Full intellectual property rights over the app.
   * No reliance on third-party services for hosting or maintenance.
5. **Security**
   * Svelte apps allow you to incorporate best practices for handling sensitive Web3 interactions (e.g., private keys, signing transactions, authentication).
6. **Cost Efficiency in the Long Run**
   * Avoid recurring fees associated with Framer or other platforms.
   * Full control over hosting costs (e.g., hosting on decentralized platforms like IPFS or Arweave).

**Cons:**

1. **Steep Learning Curve for Others**
   * If your team members aren’t as experienced with Svelte or Web3 tech stacks, onboarding new developers might take time.
2. **Development Time**
   * Building a complex app from scratch takes longer than using a pre-built platform like Framer.
   * Requires time for UI/UX design, development, and testing.
3. **Maintenance**
   * You’ll need to handle updates, bug fixes, and ongoing maintenance for the app yourself or hire developers.
4. **UI/UX Challenges**
   * Framer’s drag-and-drop tools make designing sophisticated interfaces easier, whereas Svelte would require you to build and style everything manually (though Tailwind can help here).

***

#### **Using Framer (No-Code/Low-Code Tool)**

**Pros:**

1. **Rapid Prototyping and Development**
   * Build and iterate quickly with Framer’s intuitive drag-and-drop interface.
   * Great for creating visually appealing interfaces and transitions without writing code.
2. **Ease of Use**
   * Framer requires minimal technical expertise, making it faster to create a Web3 front-end.
   * Useful for demonstrating MVPs (Minimum Viable Products) or quick pitches.
3. **Pre-Built Features**
   * Framer provides built-in components for animations, responsive design, and interactivity.
4. **Focus on Design**
   * Framer is particularly strong in designing pixel-perfect, modern UI/UX.
   * Real-time design collaboration with stakeholders and designers is seamless.
5. **Hosting and Deployment**
   * Framer can deploy your app directly with hosting included, reducing setup complexity.

**Cons:**

1. **Limited Customization**
   * Framer may not provide sufficient flexibility for integrating Web3-specific features like Sui wallet interactions, smart contract calls, or zk-STARKs.
   * Custom scripting is possible but limited compared to writing a Svelte app from scratch.
2. **Scalability Issues**
   * Framer is not designed for complex applications with high-performance demands or intricate blockchain integrations.
   * May struggle with handling dynamic data or integrating third-party APIs in a scalable way.
3. **Vendor Lock-In**
   * Your app becomes reliant on Framer's ecosystem. If the platform changes pricing, features, or discontinues services, you’ll face challenges migrating.
4. **Recurring Costs**
   * Framer charges subscription fees, which can become expensive over time for a growing app or team.
5. **Limited Backend and Blockchain Integrations**
   * While you can integrate some APIs or embed scripts, managing Web3 flows like gas fees, wallet connections, or Sui-specific smart contract interactions might be clunky or require external workarounds.
6. **Ownership and Security Risks**
   * Data and app hosting are dependent on Framer’s infrastructure, which may raise concerns for Web3 applications that emphasize decentralization and security.

***

#### **When to Choose Each Option**

**Svelte is ideal if:**

* You have strong Web3 development expertise.
* The app requires advanced custom logic, Web3-specific integrations, or scalability.
* You prioritize long-term cost efficiency, code ownership, and decentralization.
* You’re building for production and anticipate scaling or evolving the app over time.

**Framer is ideal if:**

* You’re creating a proof-of-concept, MVP, or lightweight front-end app.
* You’re prioritizing UI/UX speed and need to impress stakeholders with a polished design quickly.
* You have minimal Web3-specific features or plan to handle Web3 functionality externally.
* Budget or timelines are very tight, and you’re okay with recurring fees.

***

#### **Hybrid Approach**

Consider combining both approaches:

1. Use **Framer** for rapid prototyping or design mockups, especially if you need stakeholder approval for UI/UX concepts.
2. Transition to **Svelte** for building the production version, leveraging Framer’s designs for inspiration.

This allows you to leverage Framer’s speed for ideation while still building a robust, customizable, and scalable app in Svelte.
