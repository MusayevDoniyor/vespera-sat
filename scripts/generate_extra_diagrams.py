import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Set styling
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['mathtext.fontset'] = 'cm'
plt.rcParams['axes.edgecolor'] = '#64748b'
plt.rcParams['axes.linewidth'] = 1.2

OUT_DIR = r"C:\dev\vespera\public\diagrams"
os.makedirs(OUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. SCATTERPLOT & LINE OF BEST FIT (DAT-04)
# -------------------------------------------------------------
def generate_scatterplot():
    np.random.seed(42)
    fig, ax = plt.subplots(figsize=(8, 5.5), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)

    x = np.linspace(5, 35, 25)
    noise = np.random.normal(0, 3.5, size=len(x))
    y = 2.4 * x + 15 + noise

    # Scatter points
    ax.scatter(x, y, color='#2563eb', s=70, alpha=0.85, edgecolors='#1d4ed8', linewidth=1.5, label='Observed Data Points $(x_i, y_i)$', zorder=4)

    # Line of best fit
    x_line = np.linspace(4, 36, 100)
    y_line = 2.4 * x_line + 15
    ax.plot(x_line, y_line, color='#dc2626', linewidth=2.8, label=r'Line of Best Fit: $\hat{y} = 2.4x + 15$', zorder=5)

    # Highlight residual for a point
    idx = 14
    px, py = x[idx], y[idx]
    pred_y = 2.4 * px + 15
    ax.plot([px, px], [py, pred_y], color='#7c3aed', linestyle=':', linewidth=2.5, zorder=6)
    ax.scatter([px], [py], color='#7c3aed', s=110, edgecolors='#4c1d95', linewidth=2, zorder=7)
    ax.annotate(r'$\mathbf{Positive \ Residual:}$ $y - \hat{y} > 0$' + '\n(Observed exceeds model)',
                xy=(px, (py + pred_y)/2), xytext=(px - 10, py + 8),
                arrowprops=dict(facecolor='#7c3aed', edgecolor='#7c3aed', arrowstyle='->', lw=1.5),
                fontsize=9.5, fontweight='bold', color='#6b21a8',
                bbox=dict(boxstyle='round,pad=0.4', facecolor='#f5f3ff', edgecolor='#c4b5fd', lw=1))

    # Slope interpretation callout
    ax.text(6, 85, r'$\mathbf{Slope \ (m = 2.4):}$ For each $1$-unit increase in $x$,' + '\n' +
                   r'$\hat{y}$ is predicted to increase by $2.4$ units.' + '\n' +
                   r'$\mathbf{Intercept \ (b = 15):}$ Predicted value when $x = 0$.',
            fontsize=9.5, color='#1e293b',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#eff6ff', edgecolor='#93c5fd', lw=1))

    ax.set_title('Digital SAT Scatterplot, Linear Regression & Residuals', fontsize=12.5, fontweight='bold', pad=12, color='#0f172a')
    ax.set_xlabel('Independent Variable $x$ (e.g. Study Hours)', fontsize=10.5, labelpad=8)
    ax.set_ylabel('Dependent Variable $y$ (e.g. Test Score)', fontsize=10.5, labelpad=8)
    ax.set_xlim(3, 37)
    ax.set_ylim(10, 110)
    ax.legend(loc='lower right', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9.5)

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_scatterplot_bestfit.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 2. STATISTICS: NORMAL DISTRIBUTION & BOXPLOT (DAT-03)
# -------------------------------------------------------------
def generate_statistics():
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(9, 6.8), dpi=300, gridspec_kw={'height_ratios': [2.2, 1]})
    fig.patch.set_facecolor('#ffffff')

    # Top: Normal distribution bell curve
    ax1.set_facecolor('#fafafc')
    mu, sigma = 100, 15
    x = np.linspace(mu - 3.5*sigma, mu + 3.5*sigma, 500)
    y = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma)**2)
    ax1.plot(x, y, color='#1e40af', linewidth=2.5)

    # Shading 68% (mu +/- 1 sigma)
    idx1 = (x >= mu - sigma) & (x <= mu + sigma)
    ax1.fill_between(x[idx1], y[idx1], color='#3b82f6', alpha=0.35, label=r'$\mathbf{68\%}$ within $\mu \pm 1\sigma$')

    # Shading 95% (mu +/- 2 sigma)
    idx2 = (x >= mu - 2*sigma) & (x <= mu + 2*sigma)
    ax1.fill_between(x[idx2], y[idx2], color='#93c5fd', alpha=0.25, label=r'$\mathbf{95\%}$ within $\mu \pm 2\sigma$')

    ax1.axvline(mu, color='#dc2626', linestyle='--', linewidth=2, label=r'Mean = Median ($\mu = 100$)')
    ax1.set_title('Digital SAT 68-95-99.7 Empirical Rule & Normal Distribution', fontsize=11.5, fontweight='bold', color='#0f172a')
    ax1.set_ylabel('Probability Density', fontsize=9.5)
    ax1.legend(loc='upper right', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=8.5)
    ax1.set_xticks([mu - 3*sigma, mu - 2*sigma, mu - sigma, mu, mu + sigma, mu + 2*sigma, mu + 3*sigma])
    ax1.set_xticklabels([r'$\mu-3\sigma$', r'$\mu-2\sigma$', r'$\mu-1\sigma$', r'$\mu$', r'$\mu+1\sigma$', r'$\mu+2\sigma$', r'$\mu+3\sigma$'])

    # Bottom: Box and Whisker Plot
    ax2.set_facecolor('#fafafc')
    box_data = [65, 80, 88, 92, 95, 100, 102, 105, 110, 115, 125, 138]
    bp = ax2.boxplot(box_data, vert=False, patch_artist=True, widths=0.5,
                     boxprops=dict(facecolor='#dbeafe', color='#2563eb', linewidth=1.8),
                     medianprops=dict(color='#dc2626', linewidth=2.5),
                     whiskerprops=dict(color='#2563eb', linewidth=1.5),
                     capprops=dict(color='#2563eb', linewidth=1.5))
    ax2.set_title(r'Box Plot: Minimum, $Q_1$, Median, $Q_3$, Maximum & $\text{IQR} = Q_3 - Q_1$', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax2.set_yticks([])
    ax2.set_xlabel('Data Values', fontsize=9.5)

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_statistics_box_normal.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 3. TRIGONOMETRIC IDENTITIES & COMPLEMENTARY ANGLES (GEO-03)
# -------------------------------------------------------------
def generate_trig_identities():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5), dpi=300)
    fig.patch.set_facecolor('#ffffff')

    # Left: Right Triangle ABC with complementary angles
    ax1.set_facecolor('#fafafc')
    ax1.plot([0, 4, 4, 0], [0, 0, 3, 0], color='#1e3a8a', linewidth=2.8)
    ax1.fill([0, 4, 4], [0, 0, 3], color='#eff6ff', alpha=0.5)

    # Right angle square at (4, 0)
    ax1.plot([3.6, 3.6, 4], [0, 0.4, 0.4], color='#1e3a8a', linewidth=1.5)

    # Angle annotations
    ax1.text(0.6, 0.2, r'$x^\circ$', fontsize=11, fontweight='bold', color='#2563eb')
    ax1.text(3.4, 2.3, r'$90^\circ - x$', fontsize=10.5, fontweight='bold', color='#7c3aed')

    # Side labels
    ax1.text(2, -0.4, r'Adjacent to $x$ = 4', ha='center', fontsize=9.5, color='#334155')
    ax1.text(4.2, 1.5, r'Opposite to $x$ = 3', va='center', fontsize=9.5, color='#334155')
    ax1.text(1.8, 1.8, r'Hypotenuse = 5', rotation=36, ha='center', fontsize=9.5, fontweight='bold', color='#dc2626')

    ax1.text(2, -1.2, r'$\mathbf{Co\text{-}Function \ Identity:}$' + '\n' +
                      r'$\sin(x) = \cos(90^\circ - x) = \frac{3}{5}$' + '\n' +
                      r'$\cos(x) = \sin(90^\circ - x) = \frac{4}{5}$',
             ha='center', fontsize=10, bbox=dict(boxstyle='round,pad=0.4', facecolor='#f0fdf4', edgecolor='#86efac', lw=1.2))

    ax1.set_xlim(-0.8, 5.5)
    ax1.set_ylim(-1.8, 3.8)
    ax1.axis('off')
    ax1.set_title('Co-Function Rule in Right Triangles', fontsize=11, fontweight='bold', color='#0f172a')

    # Right: Unit Circle & Pythagorean Identity
    ax2.set_facecolor('#fafafc')
    circle = patches.Circle((0, 0), 1, fill=False, edgecolor='#64748b', linewidth=2, linestyle='--')
    ax2.add_patch(circle)
    ax2.axhline(0, color='#94a3b8', linewidth=1)
    ax2.axvline(0, color='#94a3b8', linewidth=1)

    theta = np.pi / 4.5
    px, py = np.cos(theta), np.sin(theta)
    ax2.plot([0, px], [0, py], color='#dc2626', linewidth=2.5)
    ax2.plot([px, px], [0, py], color='#2563eb', linewidth=2, linestyle=':')
    ax2.plot([0, px], [0, 0], color='#16a34a', linewidth=2, linestyle=':')
    ax2.scatter([px], [py], color='#dc2626', s=80, zorder=5)

    ax2.text(px + 0.08, py + 0.05, r'$(x, y) = (\cos\theta, \sin\theta)$', fontsize=9.5, fontweight='bold', color='#dc2626')
    ax2.text(0.3, -0.22, r'$\cos\theta$', fontsize=10, color='#16a34a', fontweight='bold')
    ax2.text(px + 0.04, py/2, r'$\sin\theta$', fontsize=10, color='#2563eb', fontweight='bold')

    ax2.text(0, -1.4, r'$\mathbf{Pythagorean \ Identity:}$' + '\n' +
                      r'$\sin^2\theta + \cos^2\theta = 1$' + '\n' +
                      r'$\tan\theta = \frac{\sin\theta}{\cos\theta}$',
             ha='center', fontsize=10, bbox=dict(boxstyle='round,pad=0.4', facecolor='#eff6ff', edgecolor='#93c5fd', lw=1.2))

    ax2.set_xlim(-1.5, 1.8)
    ax2.set_ylim(-1.8, 1.5)
    ax2.axis('off')
    ax2.set_title('Unit Circle Coordinates & Identity', fontsize=11, fontweight='bold', color='#0f172a')

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_trig_identities.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 4. SIMILAR TRIANGLES & SHADOW PROBLEMS (GEO-02)
# -------------------------------------------------------------
def generate_similar_triangles():
    fig, ax = plt.subplots(figsize=(9, 5), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')

    # Ground line
    ax.plot([-1, 15], [0, 0], color='#475569', linewidth=2.5)

    # Large Tree / Triangle (Height 10, Shadow 5)
    ax.plot([0, 0], [0, 10], color='#16a34a', linewidth=4, label='Tree A (Height = 10 ft)')
    ax.plot([0, 5], [10, 0], color='#d97706', linewidth=2.2, linestyle='--', label='Sun Rays (Parallel $\\theta$)')
    ax.plot([0, 5], [0, 0], color='#2563eb', linewidth=3)
    ax.text(2.5, -0.6, r'Shadow $A = 5$ ft', ha='center', fontsize=9.5, fontweight='bold', color='#2563eb')
    ax.text(-0.5, 5, r'Height $10$ ft', va='center', rotation=90, fontsize=9.5, fontweight='bold', color='#15803d')

    # Small Tree / Triangle (Height 4, Shadow 2)
    offset = 9
    ax.plot([offset, offset], [0, 4], color='#16a34a', linewidth=4, label='Tree B (Height = $h$ ft)')
    ax.plot([offset, offset + 2], [4, 0], color='#d97706', linewidth=2.2, linestyle='--')
    ax.plot([offset, offset + 2], [0, 0], color='#2563eb', linewidth=3)
    ax.text(offset + 1, -0.6, r'Shadow $B = 2$ ft', ha='center', fontsize=9.5, fontweight='bold', color='#2563eb')
    ax.text(offset - 0.5, 2, r'Height $h = 4$ ft', va='center', rotation=90, fontsize=9.5, fontweight='bold', color='#15803d')

    # Core Ratio Box
    ax.text(5.5, 8.5, r'$\mathbf{Similar \ Triangles \ Ratio:}$' + '\n' +
                      r'$\frac{\text{Height } A}{\text{Shadow } A} = \frac{\text{Height } B}{\text{Shadow } B}$' + '\n' +
                      r'$\frac{10}{5} = \frac{h}{2} \rightarrow 2 = \frac{h}{2} \rightarrow \mathbf{h = 4 \text{ ft}}$',
            ha='center', fontsize=10.5, bbox=dict(boxstyle='round,pad=0.5', facecolor='#fef3c7', edgecolor='#f59e0b', lw=1.5))

    ax.set_title('Digital SAT Similar Triangles & Sun Shadow Proportions', fontsize=12, fontweight='bold', color='#0f172a', pad=10)
    ax.set_xlim(-2, 14)
    ax.set_ylim(-1.5, 11)
    ax.axis('off')
    ax.legend(loc='upper right', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9)

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_similar_triangles.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 5. 3D SOLIDS GEOMETRY (GEO-01)
# -------------------------------------------------------------
def generate_solids():
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(11, 4.5), dpi=300)
    fig.patch.set_facecolor('#ffffff')

    # Cylinder
    ax1.set_facecolor('#fafafc')
    # Top ellipse
    top_el = patches.Ellipse((0.5, 0.8), 0.6, 0.2, fill=True, facecolor='#dbeafe', edgecolor='#1e40af', linewidth=2)
    # Bottom ellipse
    bot_el = patches.Ellipse((0.5, 0.2), 0.6, 0.2, fill=True, facecolor='#bfdbfe', edgecolor='#1e40af', linewidth=2)
    ax1.add_patch(bot_el)
    ax1.plot([0.2, 0.2], [0.2, 0.8], color='#1e40af', linewidth=2)
    ax1.plot([0.8, 0.8], [0.2, 0.8], color='#1e40af', linewidth=2)
    ax1.add_patch(top_el)
    ax1.text(0.5, -0.15, r'$\mathbf{Right \ Cylinder}$' + '\n' + r'$V = \pi r^2 h$' + '\n' + r'$\text{Surface Area} = 2\pi r h + 2\pi r^2$',
             ha='center', fontsize=9.5, bbox=dict(boxstyle='round,pad=0.3', facecolor='#eff6ff', edgecolor='#93c5fd', lw=1))
    ax1.set_xlim(0, 1)
    ax1.set_ylim(-0.35, 1.05)
    ax1.axis('off')

    # Cone
    ax2.set_facecolor('#fafafc')
    cone_base = patches.Ellipse((0.5, 0.2), 0.6, 0.2, fill=True, facecolor='#fef3c7', edgecolor='#d97706', linewidth=2)
    ax2.add_patch(cone_base)
    ax2.plot([0.2, 0.5, 0.8], [0.2, 0.85, 0.2], color='#d97706', linewidth=2)
    ax2.plot([0.5, 0.5], [0.2, 0.85], color='#b45309', linestyle=':', linewidth=1.5)
    ax2.text(0.5, -0.15, r'$\mathbf{Right \ Cone}$' + '\n' + r'$V = \frac{1}{3}\pi r^2 h$',
             ha='center', fontsize=9.5, bbox=dict(boxstyle='round,pad=0.3', facecolor='#fffbeb', edgecolor='#fcd34d', lw=1))
    ax2.set_xlim(0, 1)
    ax2.set_ylim(-0.35, 1.05)
    ax2.axis('off')

    # Sphere
    ax3.set_facecolor('#fafafc')
    sphere = patches.Circle((0.5, 0.5), 0.35, fill=True, facecolor='#f0fdf4', edgecolor='#16a34a', linewidth=2)
    ax3.add_patch(sphere)
    equator = patches.Ellipse((0.5, 0.5), 0.7, 0.2, fill=False, edgecolor='#16a34a', linewidth=1.5, linestyle='--')
    ax3.add_patch(equator)
    ax3.plot([0.5, 0.85], [0.5, 0.5], color='#15803d', linewidth=2)
    ax3.text(0.67, 0.55, r'$r$', fontsize=10, color='#15803d', fontweight='bold')
    ax3.text(0.5, -0.15, r'$\mathbf{Sphere}$' + '\n' + r'$V = \frac{4}{3}\pi r^3$' + '\n' + r'$\text{Surface Area} = 4\pi r^2$',
             ha='center', fontsize=9.5, bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0fdf4', edgecolor='#86efac', lw=1))
    ax3.set_xlim(0, 1)
    ax3.set_ylim(-0.35, 1.05)
    ax3.axis('off')

    fig.suptitle('Digital SAT 3D Solids Geometry & Volume Reference Formulas', fontsize=12, fontweight='bold', y=0.98, color='#0f172a')
    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_solids_geometry.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

if __name__ == "__main__":
    generate_scatterplot()
    generate_statistics()
    generate_trig_identities()
    generate_similar_triangles()
    generate_solids()
    print("All additional SAT diagrams generated successfully!")
