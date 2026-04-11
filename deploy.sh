#!/usr/bin/env bash
# ============================================================
# Weekly Todo App - Railway Deployment Script
# Run this AFTER: railway login
# Usage: bash deploy.sh
# ============================================================
set -e

echo "=== Weekly Todo - Railway Deploy ==="

# ── Step 1: Create project ──────────────────────────────────
echo ""
echo "[1/6] Creating Railway project..."
railway init --name "weekly-todo"

# ── Step 2: PostgreSQL ──────────────────────────────────────
echo ""
echo "[2/6] Adding PostgreSQL..."
railway add --plugin postgresql
echo "Waiting for PostgreSQL to provision..."
sleep 5

# ── Step 3: Deploy Backend ──────────────────────────────────
echo ""
echo "[3/6] Deploying backend..."
cd backend
railway up --service backend --detach
cd ..

# ── Step 4: Get backend URL ─────────────────────────────────
echo ""
echo "[4/6] Getting backend domain..."
BACKEND_URL=$(railway domain --service backend 2>/dev/null || echo "")
if [ -z "$BACKEND_URL" ]; then
  echo "  Generating backend domain..."
  railway domain --service backend
  BACKEND_URL=$(railway domain --service backend)
fi
BACKEND_URL="https://${BACKEND_URL}"
echo "  Backend URL: $BACKEND_URL"

# ── Step 5: Deploy Frontend ─────────────────────────────────
echo ""
echo "[5/6] Deploying frontend..."
cd frontend
# Inject backend URL into frontend build
railway variables set VITE_API_URL="$BACKEND_URL" --service frontend
railway up --service frontend --detach
cd ..

# ── Step 6: Wire CORS ───────────────────────────────────────
echo ""
echo "[6/6] Configuring CORS..."
FRONTEND_URL=$(railway domain --service frontend 2>/dev/null || echo "")
if [ -z "$FRONTEND_URL" ]; then
  railway domain --service frontend
  FRONTEND_URL=$(railway domain --service frontend)
fi
FRONTEND_URL="https://${FRONTEND_URL}"
railway variables set FRONTEND_URL="$FRONTEND_URL" --service backend
echo "  Frontend URL: $FRONTEND_URL"

echo ""
echo "============================================"
echo "Deploy complete!"
echo "  Backend:  $BACKEND_URL/api/health"
echo "  Frontend: $FRONTEND_URL"
echo "============================================"
echo ""
echo "Verify with:"
echo "  curl $BACKEND_URL/api/health"
