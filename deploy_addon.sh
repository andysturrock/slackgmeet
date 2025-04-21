#!/bin/bash

. ./.env
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Build the Docker image
docker build -t "$IMAGE_NAME" -f packages/backend/Dockerfile packages/backend

# Push the image to Google Container Registry (GCR)
docker push "$IMAGE_NAME"

# Deploy to Cloud Run
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated # Adjust as needed for your security requirements

echo "Cloud Run service deployed at: $(gcloud run services describe "$SERVICE_NAME" --project "$PROJECT_ID" --region "$REGION" --format='value(status.url)')"

# Replace the vars in the manifest with values from .env
pid=$$
sed -e "s/PROJECT_NUMBER/${PROJECT_NUMBER}/" manifest.json > /tmp/manifest.$pid.json
sed -i "s/REGION/${REGION}/" /tmp/manifest.$pid.json

# Now deploy the add-on
gcloud workspace-add-ons deployments describe slackgmeet --project "$PROJECT_ID" 2>/dev/null | grep -q slackgmeet
if [[ $status -eq 0 ]]
then
  echo "Replacing existing addon deployment..."
  gcloud workspace-add-ons deployments replace slackgmeet --deployment-file=/tmp/manifest.$pid.json --project "$PROJECT_ID"
else
  echo "Creating new addon deployment..."
  gcloud workspace-add-ons deployments create slackgmeet --deployment-file=/tmp/manifest.$pid.json --project "$PROJECT_ID"
fi

rm -f /tmp/manifest.$pid.json