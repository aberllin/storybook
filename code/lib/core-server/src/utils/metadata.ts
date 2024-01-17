// eslint-disable-next-line import/no-unresolved
import * as fse from 'fs-extra/esm';
import type { Request, Response, Router } from 'express';
import { getStorybookMetadata } from '@storybook/telemetry';

export async function extractStorybookMetadata(outputFile: string, configDir: string) {
  const storybookMetadata = await getStorybookMetadata(configDir);

  await fse.writeJSON(outputFile, storybookMetadata);
}

export function useStorybookMetadata(router: Router, configDir?: string) {
  router.use('/project.json', async (req: Request, res: Response) => {
    const storybookMetadata = await getStorybookMetadata(configDir);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(storybookMetadata));
  });
}
