@echo off
echo Creating assets folder...
mkdir "assets" 2>nul
echo Copying images...
copy "C:\Users\HP\.gemini\antigravity\brain\1ec5ac97-a608-4bd0-98be-535a0e432d8d\hero_bg_1776799406725.png" "assets\hero_bg.png"
copy "C:\Users\HP\.gemini\antigravity\brain\1ec5ac97-a608-4bd0-98be-535a0e432d8d\broker_portrait_1776799532116.png" "assets\broker_portrait.png"
echo Done! Please deploy to Vercel now.
pause
