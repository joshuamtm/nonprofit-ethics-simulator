# Nonprofit AI Trolley Problem

An interactive ethical simulation exploring AI implementation decisions in nonprofit organizations.

## Overview

This web application presents 5 real-world scenarios where nonprofit organizations must decide whether to implement AI solutions. Each scenario involves trade-offs between efficiency and ethics, scale and sensitivity.

## Features

- **5 Ethical Scenarios**: Real-world dilemmas from grant-making, fundraising, crisis support, food distribution, and youth mentoring
- **Interactive Decision Making**: Choose to implement AI or maintain human-centered approaches
- **Outcome Analysis**: See the consequences of your decisions with thoughtful reflections
- **Decision Summary**: Review all your choices at the end of the simulation
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Scenarios Included

1. **InnovateForGood**: Grant approval automation
2. **HavenHeart**: AI-powered donor outreach
3. **Crisis Text Line**: Automated mental health triage
4. **Food Bank Network**: AI distribution optimization
5. **Youth Mentor Match**: Algorithmic pairing system

## Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No server or build process required!

### File Structure

```
nonprofit-trolley-bot/
├── index.html        # Main HTML structure
├── style.css         # Styling and responsive design
├── script.js         # Game logic and interactions
├── scenarios.json    # Scenario data and content
└── README.md         # Documentation
```

## Deployment

### Netlify (Recommended)

1. Push code to GitHub repository
2. Connect GitHub repo to Netlify
3. Deploy with default settings (no build command needed)
4. Your site will be live at `https://[your-site-name].netlify.app`

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually main)
4. Site will be available at `https://[username].github.io/[repo-name]`

### Manual Hosting

Simply upload all files to any web server. No build process or dependencies required.

## Customization

### Adding New Scenarios

Edit `scenarios.json` to add new scenarios. Each scenario needs:

```json
{
  "id": "unique-identifier",
  "title": "Scenario Title",
  "currentState": "Description of current situation",
  "aiOpportunity": "What the AI solution would do",
  "benefits": ["Benefit 1", "Benefit 2", "..."],
  "risks": ["Risk 1", "Risk 2", "..."],
  "pullLeverOutcome": "What happens if AI is implemented",
  "dontPullOutcome": "What happens if status quo is maintained",
  "reflection": "Thoughtful analysis of the dilemma"
}
```

### Styling

Modify `style.css` to change:
- Color scheme (look for CSS variables and gradient definitions)
- Typography (font-family declarations)
- Layout spacing (padding and margin values)
- Button styles (`.btn` classes)

## Technical Details

- **Pure JavaScript**: No frameworks or build tools required
- **Responsive CSS**: Mobile-first design approach
- **Accessible**: High contrast, keyboard navigation support
- **Progressive Enhancement**: Works without JavaScript (shows content)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Educational Use

This tool is designed for:
- Nonprofit leadership training
- Ethics workshops
- AI literacy programs
- Board discussions about technology adoption
- University courses on tech ethics

## Future Enhancements

Potential additions for v2:
- User response tracking and analytics
- Additional scenarios (10-15 total)
- Share results functionality
- Detailed ethical framework explanations
- Facilitator mode with discussion prompts
- Multi-language support

## License

This project is open source and available for educational and nonprofit use.

## Acknowledgments

Created as an educational tool to help nonprofit professionals navigate the complex ethical landscape of AI adoption.

---

For questions or suggestions, please open an issue on GitHub.