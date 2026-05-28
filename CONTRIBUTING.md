# Contributing to DStudio

Thank you for considering contributing to DStudio! We appreciate your interest in helping us build a better code editor. This document provides guidelines and instructions for contributing.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful of each other and maintain a friendly atmosphere.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing opinions and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and the expected behavior**
* **Explain why this enhancement would be useful**
* **List some other editors or applications where this enhancement exists**

### Pull Requests

* Follow the JavaScript/React styleguides
* Include appropriate test cases
* End all files with a newline
* Keep commit messages clear and descriptive
* Reference issues and discussions in your PR description

## Development Setup

### 1. Fork the Repository

Click the "Fork" button in the top right corner of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/dstudio.git
cd dstudio
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/original-owner/dstudio.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-syntax-highlighting`
- `fix/editor-crashes`
- `docs/improve-readme`

### 5. Install Dependencies

```bash
npm install
```

### 6. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Styleguides

### JavaScript/React Style

* Use ES6+ syntax
* Use meaningful variable and function names
* Use const and let instead of var
* Write JSX with proper formatting
* Keep functions small and focused
* Use comments for complex logic
* Follow existing code patterns

Example:

```javascript
// Good
const handleFileCreate = (fileName) => {
  const newFile = {
    id: Date.now(),
    name: fileName,
    content: ''
  };
  setFiles([...files, newFile]);
};

// Bad
function handleFileCreate(fn) {
  let nf = {id: Date.now(), n: fn, c: ''};
  setFiles([...files, nf]);
}
```

### CSS/Styling

* Use CSS variables for consistency
* Use meaningful class names
* Keep selectors specific but not overly nested
* Use flexbox/grid for layouts
* Test on multiple screen sizes

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example:

```
Add real-time code preview feature

- Implement iframe-based preview
- Add toggle button to show/hide preview
- Support HTML, CSS, and JavaScript files
- Add preview error handling

Closes #42
```

### Documentation

* Update README.md if changing functionality
* Document new features with examples
* Keep documentation clear and concise
* Include code examples where appropriate

## Testing

### Manual Testing

1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices or use DevTools device emulation
3. Test with both light and dark modes
4. Test with different file types
5. Test project creation and editing

### Before Submitting

- [ ] Code follows the styleguides
- [ ] Changes are tested
- [ ] Documentation is updated
- [ ] No console errors in DevTools
- [ ] Performance is acceptable
- [ ] Mobile responsiveness is maintained

## Pull Request Process

1. **Update** your branch with the latest upstream master
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Push** your changes to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create** a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - List of changes made
   - Screenshots if UI changes

4. **Respond** to review comments and make requested changes

5. **Merge** once approved by maintainers

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Community

* **Discord**: [Join our Discord server](https://discord.gg/dstudio)
* **Discussions**: Use GitHub Discussions for questions
* **Issues**: Use GitHub Issues for bugs and feature requests
* **Email**: reach out to support@dstudio.app

## License

By contributing to DStudio, you agree that your contributions will be licensed under its MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

## Questions?

Feel free to open an issue or start a discussion with your questions. The DStudio community is here to help!

---

Thank you for contributing to DStudio! Together, we're building something amazing. 🚀
