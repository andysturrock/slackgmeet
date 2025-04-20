import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the frontend build directory
const frontendBuildPath = path.join(__dirname, 'frontend', 'build');
app.use('/static', express.static(path.join(frontendBuildPath, 'static')));
app.use(express.static(frontendBuildPath));

app.get('/main-stage', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.get('/side-panel', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});