#!/bin/bash

PROJECT_ID="slackgmeet"
SERVICE_NAME="meet-addon-backend"
REGION="europe-west2"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Build the Docker image
docker build -t "$IMAGE_NAME" -f packages/backend/Dockerfile packages/backend

# Push the image to Google Container Registry (GCR)
docker push "$IMAGE_NAME"

# Deploy to Cloud Run
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_NAME" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated # Adjust as needed for your security requirements

echo "Cloud Run service deployed at: $(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format='value(status.url)')"