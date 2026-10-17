import os
import math
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.path import Path
from PIL import Image

output_dir = r"C:\dev\vespera\public"
os.makedirs(output_dir, exist_ok=True)

# -------------------------------------------------------------
# 1. Generate 180x180 Apple Touch Icon & Favicon source
# -------------------------------------------------------------
def generate_icon(size=512, filepath=None):
    fig, ax = plt.subplots(figsize=(size/100, size/100), dpi=100)
    fig.patch.set_facecolor('#090d16')
    ax.set_facecolor('#090d16')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Draw rounded shield / background
    shield = patches.FancyBboxPatch((12, 12), 76, 76,
                                  boxstyle="round,pad=0,rounding_size=20",
                                  facecolor='#2563eb', edgecolor='#38bdf8',
                                  linewidth=2.5, alpha=0.95)
    ax.add_patch(shield)

    # Subtle grid
    for x in [35, 65]:
        ax.plot([x, x], [12, 88], color='#ffffff', alpha=0.1, lw=1, linestyle='--')
    for y in [35, 65]:
        ax.plot([12, 88], [y, y], color='#ffffff', alpha=0.1, lw=1, linestyle='--')

    # Orbital ring (tilted ellipse)
    t = np.linspace(0, 2*np.pi, 200)
    rx, ry = 30, 13
    angle = np.radians(28)
    x_rot = 50 + rx * np.cos(t) * np.cos(angle) - ry * np.sin(t) * np.sin(angle)
    y_rot = 50 + rx * np.cos(t) * np.sin(angle) + ry * np.sin(t) * np.cos(angle)
    ax.plot(x_rot, y_rot, color='#ffffff', alpha=0.4, lw=2.5, linestyle=':')

    # Chevron V wings (inverted Y in cartesian where y=0 is bottom)
    # Left wing
    left_v = patches.Polygon([[28, 68], [50, 28], [44, 28], [24, 68]], closed=True, facecolor='#ffffff', alpha=0.95)
    ax.add_patch(left_v)
    # Right wing
    right_v = patches.Polygon([[72, 68], [50, 28], [56, 28], [76, 68]], closed=True, facecolor='#c7d2fe', alpha=0.85)
    ax.add_patch(right_v)

    # Guiding Diamond Beacon
    diamond = patches.Polygon([[50, 78], [54, 64], [68, 60], [54, 56], [50, 42], [46, 56], [32, 60], [46, 64]],
                              closed=True, facecolor='#ffffff')
    ax.add_patch(diamond)

    # Starlight core
    ax.plot(50, 60, 'o', color='#38bdf8', markersize=size*0.02)
    ax.plot(50, 60, 'o', color='#ffffff', markersize=size*0.01)

    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    temp_path = os.path.join(output_dir, "temp_icon.png")
    plt.savefig(temp_path, dpi=100, bbox_inches='tight', pad_inches=0, facecolor='#090d16')
    plt.close()

    img = Image.open(temp_path).resize((size, size), Image.Resampling.LANCZOS)
    if filepath:
        img.save(filepath)
    return img

print("Generating icons...")
icon_512 = generate_icon(512)

# Save apple-touch-icon (180x180)
apple_icon = icon_512.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(os.path.join(output_dir, "apple-touch-icon.png"), format="PNG")

# Save favicon.ico (16, 32, 48)
favicon_path = os.path.join(output_dir, "favicon.ico")
icon_512.save(favicon_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

# Also copy to src/app/favicon.ico
src_app_favicon = r"C:\dev\vespera\src\app\favicon.ico"
icon_512.save(src_app_favicon, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Icons saved successfully.")

# -------------------------------------------------------------
# 2. Generate 1200x630 OpenGraph Banner (og-image.png)
# -------------------------------------------------------------
print("Generating OpenGraph social preview banner (1200x630)...")
fig, ax = plt.subplots(figsize=(12, 6.3), dpi=100)
fig.patch.set_facecolor('#070b14')
ax.set_facecolor('#070b14')
ax.set_xlim(0, 1200)
ax.set_ylim(0, 630)
ax.axis('off')

# Cosmic gradient grid lines & glow background
for x in range(0, 1201, 80):
    ax.plot([x, x], [0, 630], color='#1e293b', alpha=0.35, lw=1)
for y in range(0, 631, 70):
    ax.plot([0, 1200], [y, y], color='#1e293b', alpha=0.35, lw=1)

# Subtle ambient glow circle behind brand
ambient = patches.Circle((260, 315), 240, facecolor='#2563eb', alpha=0.12)
ax.add_patch(ambient)
ambient2 = patches.Circle((950, 420), 180, facecolor='#9333ea', alpha=0.10)
ax.add_patch(ambient2)

# Card border container
card = patches.FancyBboxPatch((30, 30), 1140, 570,
                             boxstyle="round,pad=0,rounding_size=24",
                             facecolor='none', edgecolor='#3b82f6',
                             linewidth=2, alpha=0.4)
ax.add_patch(card)

# Brand Badge at Top Left
badge = patches.FancyBboxPatch((90, 480), 280, 46,
                              boxstyle="round,pad=0,rounding_size=23",
                              facecolor='#1e293b', edgecolor='#38bdf8',
                              linewidth=1.5, alpha=0.9)
ax.add_patch(badge)
ax.text(230, 503, "D I G I T A L   S A T   A U T O N O M O U S   S U I T E", color='#38bdf8',
        fontsize=10, fontweight='heavy', ha='center', va='center', family='sans-serif')

# Main Title Typography
ax.text(90, 410, "VESPERA SAT", color='#ffffff',
        fontsize=46, fontweight='black', ha='left', va='center', family='sans-serif')
ax.text(90, 335, "Autonomous 1550+ Digital SAT Mastery", color='#93c5fd',
        fontsize=24, fontweight='bold', ha='left', va='center', family='sans-serif')

# Value propositions
features = [
    "✦  Official Desmos Speed Lab & 10-Second Linear Hacks",
    "✦  16 Publication-Grade Visual Diagrams (Math & Verbal)",
    "✦  Spaced Repetition & Adaptive Bluebook Testing Engine"
]
for i, feat in enumerate(features):
    ax.text(90, 260 - (i * 38), feat, color='#cbd5e1',
            fontsize=15, fontweight='medium', ha='left', va='center', family='sans-serif')

# Score / Benchmark Pill Badges on the Right
badge_configs = [
    ("1550+", "Target Composite", '#38bdf8', 380),
    ("800", "Math Full Mastery", '#4ade80', 250),
    ("780+", "Reading & Writing", '#c084fc', 120),
]

for score, label, color, y_pos in badge_configs:
    box = patches.FancyBboxPatch((850, y_pos), 250, 95,
                                boxstyle="round,pad=0,rounding_size=18",
                                facecolor='#0f172a', edgecolor=color,
                                linewidth=2, alpha=0.85)
    ax.add_patch(box)
    ax.text(880, y_pos + 52, score, color=color,
            fontsize=32, fontweight='black', ha='left', va='center', family='sans-serif')
    ax.text(880, y_pos + 22, label, color='#94a3b8',
            fontsize=13, fontweight='bold', ha='left', va='center', family='sans-serif')

# Domain footer
ax.text(90, 65, "vespera.academy  ·  Built for Serious SAT Aspirants", color='#64748b',
        fontsize=13, fontweight='semibold', ha='left', va='center', family='sans-serif')

plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
og_path = os.path.join(output_dir, "og-image.png")
plt.savefig(og_path, dpi=100, facecolor='#070b14')
plt.close()

# Cleanup temp
temp_icon = os.path.join(output_dir, "temp_icon.png")
if os.path.exists(temp_icon):
    os.remove(temp_icon)

print("og-image.png created successfully at", og_path)
