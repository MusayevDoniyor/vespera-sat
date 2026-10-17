import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Set clean styling for publication/textbook quality
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['mathtext.fontset'] = 'cm'
plt.rcParams['axes.edgecolor'] = '#64748b'
plt.rcParams['axes.linewidth'] = 1.2

OUT_DIR = r"C:\vespera\public\diagrams"
os.makedirs(OUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. LINEAR SLOPE & INTERCEPT DIAGRAM
# -------------------------------------------------------------
def generate_slope_diagram():
    fig, ax = plt.subplots(figsize=(8, 5.5), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')

    # Grid
    ax.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)

    # Coordinate ranges
    x = np.linspace(-4, 6, 400)

    # Main line: y = 1.5x + 1
    y_main = 1.5 * x + 1
    ax.plot(x, y_main, color='#2563eb', linewidth=2.8, label=r'Main Line: $y = \frac{3}{2}x + 1$ ($m_1 = 1.5$)')

    # Parallel line: y = 1.5x - 3
    y_par = 1.5 * x - 3
    ax.plot(x, y_par, color='#3b82f6', linestyle='--', linewidth=2.0, alpha=0.85, label=r'Parallel Line: $y = 1.5x - 3$ ($m_2 = m_1$)')

    # Perpendicular line: y = - (2/3)x + 1 (intersects at (0, 1))
    y_perp = -(2/3) * x + 1
    ax.plot(x, y_perp, color='#7c3aed', linewidth=2.2, label=r'Perpendicular Line: $y = -\frac{2}{3}x + 1$ ($m_\perp = -\frac{1}{m}$)')

    # Right angle symbol at (0, 1)
    sq_size = 0.4
    ax.plot([0, sq_size * 0.83], [1 + sq_size * 0.55, 1 + sq_size * 0.55 - sq_size * 0.55], color='#7c3aed', linewidth=1.2)

    # Highlight Y-Intercept (0, 1)
    ax.scatter([0], [1], color='#16a34a', s=100, zorder=5, edgecolor='#ffffff', linewidth=2)
    ax.annotate(r'$\mathbf{y\text{-intercept }} (0, b) = (0, 1)$', xy=(0, 1), xytext=(-3.6, 2.2),
                arrowprops=dict(facecolor='#16a34a', edgecolor='#16a34a', arrowstyle='->', lw=1.5),
                fontsize=10.5, fontweight='bold', color='#15803d',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0fdf4', edgecolor='#86efac', lw=1))

    # Point 2 at (2, 4)
    ax.scatter([2], [4], color='#2563eb', s=80, zorder=5, edgecolor='#ffffff', linewidth=2)

    # Rise & Run Triangle between (0, 1) and (2, 4)
    tri_x = [0, 2, 2]
    tri_y = [1, 1, 4]
    ax.fill(tri_x, tri_y, color='#f59e0b', alpha=0.18)
    ax.plot([0, 2], [1, 1], color='#d97706', linestyle=':', linewidth=2)
    ax.plot([2, 2], [1, 4], color='#d97706', linestyle=':', linewidth=2)

    # Annotate Run
    ax.text(1.0, 0.45, r'$\mathbf{Run} \ (\Delta x = 2)$', color='#b45309', fontsize=10, ha='center', fontweight='bold')
    # Annotate Rise
    ax.text(2.25, 2.5, r'$\mathbf{Rise} \ (\Delta y = 3)$', color='#b45309', fontsize=10, va='center', fontweight='bold')
    # Slope Formula callout
    ax.text(0.7, 2.6, r'$\mathbf{Slope } \ m = \frac{\Delta y}{\Delta x} = \frac{3}{2} = 1.5$',
            fontsize=11, color='#1e293b', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#ffffff', edgecolor='#cbd5e1', lw=1.2))

    # Axes styling
    ax.axhline(0, color='#334155', linewidth=1.4)
    ax.axvline(0, color='#334155', linewidth=1.4)
    ax.set_xlim(-4, 5.5)
    ax.set_ylim(-4, 6.5)
    ax.set_xlabel('x-axis', fontsize=11, fontweight='bold', color='#334155')
    ax.set_ylabel('y-axis', fontsize=11, fontweight='bold', color='#334155')
    ax.set_title('Digital SAT Coordinate Geometry: Slope-Intercept Form $y = mx + b$', fontsize=13, fontweight='bold', pad=14, color='#0f172a')
    ax.legend(loc='lower right', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9.5)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_slope_intercept.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

# -------------------------------------------------------------
# 2. QUADRATIC PARABOLA VERTEX & DISCRIMINANT DIAGRAM
# -------------------------------------------------------------
def generate_parabola_diagram():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 5.5), dpi=300, gridspec_kw={'width_ratios': [1.3, 1]})
    fig.patch.set_facecolor('#ffffff')

    # --- LEFT: Full Parabola Anatomy ---
    ax1.set_facecolor('#fafafc')
    ax1.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)

    # Parabola: y = - (x - 3)^2 + 4 = -x^2 + 6x - 5
    x = np.linspace(-0.5, 6.5, 400)
    y = -(x - 3)**2 + 4

    ax1.plot(x, y, color='#2563eb', linewidth=3.0, label=r'$y = -(x - 3)^2 + 4$ ($a = -1 < 0$)')

    # Axis of symmetry x = 3
    ax1.axvline(3, color='#94a3b8', linestyle='--', linewidth=1.8, label=r'Axis of Symmetry: $x = h = 3$')

    # Vertex (3, 4)
    ax1.scatter([3], [4], color='#ef4444', s=120, zorder=6, edgecolor='#ffffff', linewidth=2)
    ax1.annotate(r'$\mathbf{Vertex \ (h, k) = (3, 4)}$' + '\n' + r'$\mathbf{(Global \ Maximum)}$',
                 xy=(3, 4), xytext=(3, 5.2),
                 ha='center', fontsize=10.5, fontweight='bold', color='#b91c1c',
                 arrowprops=dict(facecolor='#ef4444', edgecolor='#ef4444', arrowstyle='->', lw=1.5),
                 bbox=dict(boxstyle='round,pad=0.3', facecolor='#fef2f2', edgecolor='#fecaca', lw=1))

    # Roots / x-intercepts at (1, 0) and (5, 0)
    ax1.scatter([1, 5], [0, 0], color='#16a34a', s=90, zorder=6, edgecolor='#ffffff', linewidth=2)
    ax1.text(1, -0.9, r'Root $x_1 = 1$', ha='center', fontsize=9.5, fontweight='bold', color='#15803d')
    ax1.text(5, -0.9, r'Root $x_2 = 5$', ha='center', fontsize=9.5, fontweight='bold', color='#15803d')

    # Axes
    ax1.axhline(0, color='#334155', linewidth=1.4)
    ax1.axvline(0, color='#334155', linewidth=1.4)
    ax1.set_xlim(-0.5, 6.5)
    ax1.set_ylim(-3, 6.2)
    ax1.set_xlabel('x-axis', fontsize=10.5, fontweight='bold', color='#334155')
    ax1.set_ylabel('y-axis', fontsize=10.5, fontweight='bold', color='#334155')
    ax1.set_title('Parabola Anatomy: $y = a(x - h)^2 + k$', fontsize=12, fontweight='bold', color='#0f172a')
    ax1.legend(loc='lower left', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=8.5)

    # --- RIGHT: Discriminant 3 Cases ---
    ax2.set_facecolor('#fafafc')
    ax2.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)

    x_sub = np.linspace(-3, 3, 300)
    # Case 1: D > 0 (2 roots)
    y_d_pos = x_sub**2 - 2
    # Case 2: D = 0 (1 root, tangent)
    y_d_zero = x_sub**2
    # Case 3: D < 0 (0 roots, floating)
    y_d_neg = x_sub**2 + 2

    ax2.plot(x_sub, y_d_pos, color='#16a34a', linewidth=2.2, label=r'$D > 0 \rightarrow \mathbf{2 \ Real \ Roots}$')
    ax2.plot(x_sub, y_d_zero, color='#d97706', linewidth=2.2, label=r'$D = 0 \rightarrow \mathbf{1 \ Real \ Root \ (Tangent)}$')
    ax2.plot(x_sub, y_d_neg, color='#ef4444', linewidth=2.2, label=r'$D < 0 \rightarrow \mathbf{0 \ Real \ Roots \ (Floating)}$')

    ax2.axhline(0, color='#334155', linewidth=1.4)
    ax2.set_xlim(-3, 3)
    ax2.set_ylim(-3, 6.2)
    ax2.set_xlabel('x-axis', fontsize=10.5, fontweight='bold', color='#334155')
    ax2.set_title(r'Discriminant States ($D = b^2 - 4ac$)', fontsize=12, fontweight='bold', color='#0f172a')
    ax2.legend(loc='upper center', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=8.5)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_parabola_vertex.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

# -------------------------------------------------------------
# 3. SPECIAL RIGHT TRIANGLES (30-60-90 & 45-45-90)
# -------------------------------------------------------------
def generate_triangles_diagram():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 5.2), dpi=300)
    fig.patch.set_facecolor('#ffffff')

    # --- LEFT: 30-60-90 Triangle ---
    ax1.set_facecolor('#fafafc')
    ax1.set_aspect('equal')
    ax1.axis('off')

    # Coordinates: right angle at (0, 0), long leg along x (0 to sqrt(3)), short leg along y (0 to 1)
    pts1 = np.array([[0, 0], [np.sqrt(3), 0], [0, 1], [0, 0]])
    poly1 = patches.Polygon(pts1, closed=True, facecolor='#eff6ff', edgecolor='#2563eb', linewidth=3)
    ax1.add_patch(poly1)

    # Right angle square at (0, 0)
    r_sq1 = patches.Rectangle((0, 0), 0.15, 0.15, facecolor='none', edgecolor='#64748b', linewidth=1.5)
    ax1.add_patch(r_sq1)

    # Side labels
    ax1.text(-0.15, 0.5, r'$\mathbf{Short \ Leg} = x$', color='#2563eb', fontsize=12, fontweight='bold', va='center', ha='right')
    ax1.text(np.sqrt(3)/2, -0.15, r'$\mathbf{Long \ Leg} = x\sqrt{3}$', color='#d97706', fontsize=12, fontweight='bold', ha='center', va='top')
    ax1.text(np.sqrt(3)/2 + 0.1, 0.55, r'$\mathbf{Hypotenuse} = 2x$', color='#16a34a', fontsize=12, fontweight='bold', ha='left')

    # Angle labels
    ax1.text(0.12, 0.72, r'$\mathbf{60^\circ}$', color='#475569', fontsize=11, fontweight='bold')
    ax1.text(np.sqrt(3) - 0.35, 0.08, r'$\mathbf{30^\circ}$', color='#475569', fontsize=11, fontweight='bold')

    ax1.set_xlim(-0.6, 2.2)
    ax1.set_ylim(-0.35, 1.35)
    ax1.set_title(r'$\mathbf{30^\circ - 60^\circ - 90^\circ \ Triangle \ Ratio \ (x : x\sqrt{3} : 2x)}$' + '\n' +
                  r'$\sin(30^\circ) = \frac{1}{2}, \quad \cos(30^\circ) = \frac{\sqrt{3}}{2}, \quad \tan(30^\circ) = \frac{1}{\sqrt{3}}$',
                  fontsize=11, fontweight='bold', color='#0f172a', pad=12)

    # --- RIGHT: 45-45-90 Triangle ---
    ax2.set_facecolor('#fafafc')
    ax2.set_aspect('equal')
    ax2.axis('off')

    # Coordinates: right angle at (0, 0), legs = 1
    pts2 = np.array([[0, 0], [1, 0], [0, 1], [0, 0]])
    poly2 = patches.Polygon(pts2, closed=True, facecolor='#f0fdf4', edgecolor='#16a34a', linewidth=3)
    ax2.add_patch(poly2)

    # Right angle square
    r_sq2 = patches.Rectangle((0, 0), 0.12, 0.12, facecolor='none', edgecolor='#64748b', linewidth=1.5)
    ax2.add_patch(r_sq2)

    # Side labels
    ax2.text(-0.12, 0.5, r'$\mathbf{Leg} = x$', color='#2563eb', fontsize=12, fontweight='bold', va='center', ha='right')
    ax2.text(0.5, -0.15, r'$\mathbf{Leg} = x$', color='#2563eb', fontsize=12, fontweight='bold', ha='center', va='top')
    ax2.text(0.55, 0.55, r'$\mathbf{Hypotenuse} = x\sqrt{2}$', color='#16a34a', fontsize=12, fontweight='bold', ha='left')

    # Angle labels
    ax2.text(0.12, 0.75, r'$\mathbf{45^\circ}$', color='#475569', fontsize=11, fontweight='bold')
    ax2.text(0.72, 0.08, r'$\mathbf{45^\circ}$', color='#475569', fontsize=11, fontweight='bold')

    # Congruency ticks on legs
    ax2.plot([-0.04, 0.04], [0.5, 0.5], color='#2563eb', linewidth=2)
    ax2.plot([0.5, 0.5], [-0.04, 0.04], color='#2563eb', linewidth=2)

    ax2.set_xlim(-0.5, 1.5)
    ax2.set_ylim(-0.35, 1.35)
    ax2.set_title(r'$\mathbf{45^\circ - 45^\circ - 90^\circ \ Triangle \ Ratio \ (x : x : x\sqrt{2})}$' + '\n' +
                  r'$\text{Isosceles Right Triangle} \rightarrow \sin(45^\circ) = \cos(45^\circ) = \frac{\sqrt{2}}{2}$',
                  fontsize=11, fontweight='bold', color='#0f172a', pad=12)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_special_triangles.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

# -------------------------------------------------------------
# 4. CIRCLE GEOMETRY, EQUATION & SECTOR
# -------------------------------------------------------------
def generate_circle_diagram():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 5.2), dpi=300)
    fig.patch.set_facecolor('#ffffff')

    # --- LEFT: Standard Cartesian Circle Equation ---
    ax1.set_facecolor('#fafafc')
    ax1.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)
    ax1.set_aspect('equal')

    # Center (3, 2), radius r = 4
    h, k, r = 3, 2, 4
    theta = np.linspace(0, 2*np.pi, 400)
    circ_x = h + r * np.cos(theta)
    circ_y = k + r * np.sin(theta)

    ax1.plot(circ_x, circ_y, color='#2563eb', linewidth=2.8, label=r'$(x - 3)^2 + (y - 2)^2 = 16$ ($r = 4$)')
    ax1.fill(circ_x, circ_y, color='#eff6ff', alpha=0.5)

    # Center Marker
    ax1.scatter([h], [k], color='#ef4444', s=100, zorder=5, edgecolor='#ffffff', linewidth=2)
    ax1.text(h + 0.3, k - 0.4, r'$\mathbf{Center \ (h, k) = (3, 2)}$', color='#b91c1c', fontsize=10.5, fontweight='bold')

    # Radius Line from center to (3 + 4*cos(pi/4), 2 + 4*sin(pi/4))
    ang = np.pi / 4
    pt_x = h + r * np.cos(ang)
    pt_y = k + r * np.sin(ang)
    ax1.plot([h, pt_x], [k, pt_y], color='#16a34a', linewidth=2.5, linestyle='-')
    ax1.scatter([pt_x], [pt_y], color='#16a34a', s=70, zorder=5)
    ax1.text((h + pt_x)/2 - 0.3, (k + pt_y)/2 + 0.3, r'$\mathbf{r = 4}$', color='#15803d', fontsize=11, fontweight='bold')
    ax1.text(pt_x + 0.2, pt_y + 0.2, r'$(x, y)$', color='#15803d', fontsize=10.5, fontweight='bold')

    ax1.axhline(0, color='#334155', linewidth=1.4)
    ax1.axvline(0, color='#334155', linewidth=1.4)
    ax1.set_xlim(-2.5, 8.5)
    ax1.set_ylim(-3.5, 7.5)
    ax1.set_xlabel('x-axis', fontsize=10.5, fontweight='bold', color='#334155')
    ax1.set_ylabel('y-axis', fontsize=10.5, fontweight='bold', color='#334155')
    ax1.set_title('Circle Equation: $(x - h)^2 + (y - k)^2 = r^2$', fontsize=11.5, fontweight='bold', color='#0f172a', pad=12)
    ax1.legend(loc='lower left', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=8.5)

    # --- RIGHT: Sector, Arc Length & Radians ---
    ax2.set_facecolor('#fafafc')
    ax2.set_aspect('equal')
    ax2.axis('off')

    # Unit circle for arc illustration
    r_sub = 3.0
    c_sub = patches.Circle((0, 0), r_sub, facecolor='none', edgecolor='#cbd5e1', linewidth=1.5, linestyle='--')
    ax2.add_patch(c_sub)

    # Sector from 0 to 60 deg (pi/3)
    arc_ang = np.pi / 3
    th_sector = np.linspace(0, arc_ang, 100)
    sx = [0] + list(r_sub * np.cos(th_sector)) + [0]
    sy = [0] + list(r_sub * np.sin(th_sector)) + [0]
    ax2.fill(sx, sy, color='#fef3c7', alpha=0.75, edgecolor='#d97706', linewidth=2)

    # Center to endpoints
    ax2.plot([0, r_sub], [0, 0], color='#d97706', linewidth=2.5)
    ax2.plot([0, r_sub * np.cos(arc_ang)], [0, r_sub * np.sin(arc_ang)], color='#d97706', linewidth=2.5)

    # Arc Highlight
    ax2.plot(r_sub * np.cos(th_sector), r_sub * np.sin(th_sector), color='#dc2626', linewidth=4.0)

    # Central angle arc
    th_small = np.linspace(0, arc_ang, 50)
    ax2.plot(0.8 * np.cos(th_small), 0.8 * np.sin(th_small), color='#b45309', linewidth=1.8)
    ax2.text(1.0, 0.35, r'$\theta$', color='#b45309', fontsize=12, fontweight='bold')

    # Annotations
    ax2.text(r_sub / 2, -0.28, r'$\mathbf{Radius \ r}$', color='#b45309', fontsize=10.5, ha='center', fontweight='bold')
    ax2.text(r_sub * np.cos(arc_ang/2) + 0.3, r_sub * np.sin(arc_ang/2) + 0.1, r'$\mathbf{Arc \ Length \ s = r\theta}$',
             color='#dc2626', fontsize=10.5, fontweight='bold')
    ax2.text(1.3, 0.9, r'$\mathbf{Sector \ Area}$' + '\n' + r'$A = \frac{1}{2}r^2\theta$',
             color='#92400e', fontsize=10, ha='center', fontweight='bold')

    # Bottom conversion formulas
    ax2.text(0, -3.2, r'$\mathbf{Radians \ and \ Degrees \ Conversion:}$' + '\n' +
             r'$\pi \ \text{radians} = 180^\circ \rightarrow \text{Radians} = \text{Degrees} \times \frac{\pi}{180}$',
             color='#1e293b', fontsize=10.5, ha='center', va='top', fontweight='bold',
             bbox=dict(boxstyle='round,pad=0.4', facecolor='#f8fafc', edgecolor='#cbd5e1', lw=1.2))

    ax2.set_xlim(-3.6, 4.2)
    ax2.set_ylim(-4.2, 3.8)
    ax2.set_title('Arc Length, Sector Area & Radian Measure', fontsize=11.5, fontweight='bold', color='#0f172a', pad=12)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_circle_geometry.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

# -------------------------------------------------------------
# 5. ALGEBRAIC BALANCE SCALE (SOLVING 4x + 12 = 36)
# -------------------------------------------------------------
def generate_balance_scale_diagram():
    fig, ax = plt.subplots(figsize=(10, 5.2), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.axis('off')

    # Central Stand
    stand_base = patches.Rectangle((-1.2, -2.5), 2.4, 0.3, facecolor='#334155', edgecolor='#1e293b', linewidth=1.5)
    ax.add_patch(stand_base)
    # Fulcrum triangle
    triangle = patches.Polygon([(-0.6, -2.5), (0.6, -2.5), (0, 0)], closed=True, facecolor='#64748b', edgecolor='#334155', linewidth=1.5)
    ax.add_patch(triangle)
    # Pivot pin
    pivot = patches.Circle((0, 0), 0.18, facecolor='#2563eb', edgecolor='#ffffff', linewidth=1.5, zorder=5)
    ax.add_patch(pivot)

    # Balance Lever Beam
    ax.plot([-4.5, 4.5], [0, 0], color='#2563eb', linewidth=6.5, solid_capstyle='round')

    # Chains Left
    ax.plot([-3.6, -4.2], [0, -1.3], color='#94a3b8', linewidth=1.8, linestyle='--')
    ax.plot([-3.6, -3.0], [0, -1.3], color='#94a3b8', linewidth=1.8, linestyle='--')
    # Pan Left
    pan_l = patches.Arc((-3.6, -1.3), 1.8, 0.7, theta1=180, theta2=360, color='#475569', linewidth=3)
    ax.add_patch(pan_l)

    # Chains Right
    ax.plot([3.6, 3.0], [0, -1.3], color='#94a3b8', linewidth=1.8, linestyle='--')
    ax.plot([3.6, 4.2], [0, -1.3], color='#94a3b8', linewidth=1.8, linestyle='--')
    # Pan Right
    pan_r = patches.Arc((3.6, -1.3), 1.8, 0.7, theta1=180, theta2=360, color='#475569', linewidth=3)
    ax.add_patch(pan_r)

    # Left weights: 4x block + 12 weight
    box_4x = patches.Rectangle((-4.4, -1.1), 0.8, 0.55, facecolor='#eff6ff', edgecolor='#2563eb', linewidth=2)
    ax.add_patch(box_4x)
    ax.text(-4.0, -0.83, r'$\mathbf{4x}$', color='#1d4ed8', fontsize=13, fontweight='bold', ha='center', va='center')

    box_12 = patches.Rectangle((-3.4, -1.1), 0.7, 0.45, facecolor='#fef3c7', edgecolor='#d97706', linewidth=2)
    ax.add_patch(box_12)
    ax.text(-3.05, -0.88, r'$\mathbf{+12}$', color='#b45309', fontsize=11.5, fontweight='bold', ha='center', va='center')

    # Right weight: 36
    box_36 = patches.Rectangle((3.1, -1.1), 1.0, 0.55, facecolor='#f0fdf4', edgecolor='#16a34a', linewidth=2)
    ax.add_patch(box_36)
    ax.text(3.6, -0.83, r'$\mathbf{36}$', color='#15803d', fontsize=13, fontweight='bold', ha='center', va='center')

    # Equal Sign in the middle
    ax.text(0, 0.45, r'$\mathbf{=}$', color='#2563eb', fontsize=26, fontweight='bold', ha='center', va='center')

    # Step-by-Step Isolation Process Cards (3 Boxes below)
    step1_box = dict(boxstyle='round,pad=0.5', facecolor='#ffffff', edgecolor='#cbd5e1', lw=1.2)
    ax.text(-3.4, -2.6, r'$\mathbf{Step \ 1: \ Initial \ Balance}$' + '\n' + r'$4x + 12 = 36$',
            ha='center', va='top', fontsize=10.5, color='#1e293b', bbox=step1_box)

    step2_box = dict(boxstyle='round,pad=0.5', facecolor='#ffffff', edgecolor='#f59e0b', lw=1.2)
    ax.text(0, -2.6, r'$\mathbf{Step \ 2: \ Subtract \ 12 \ Both \ Sides}$' + '\n' + r'$4x = 36 - 12 = 24$',
            ha='center', va='top', fontsize=10.5, color='#b45309', bbox=step2_box)

    step3_box = dict(boxstyle='round,pad=0.5', facecolor='#ffffff', edgecolor='#16a34a', lw=1.5)
    ax.text(3.4, -2.6, r'$\mathbf{Step \ 3: \ Divide \ by \ 4}$' + '\n' + r'$x = \frac{24}{4} = \mathbf{6}$',
            ha='center', va='top', fontsize=10.5, color='#15803d', bbox=step3_box)

    ax.set_xlim(-5.2, 5.2)
    ax.set_ylim(-3.5, 1.2)
    ax.set_title('The Algebraic Balance Scale Principle: Solving Linear Equations ($4x + 12 = 36$)',
                 fontsize=13, fontweight='bold', color='#0f172a', pad=14)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_balance_scale.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

# -------------------------------------------------------------
# 6. DIGITAL SAT PUNCTUATION & SENTENCE BOUNDARY FLOWCHART
# -------------------------------------------------------------
def generate_punctuation_diagram():
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.axis('off')

    # Card 1: Semicolon / Period
    box1 = dict(boxstyle='round,pad=0.6', facecolor='#eff6ff', edgecolor='#2563eb', lw=1.8)
    ax.text(0.24, 0.76,
            r'$\mathbf{1. \ Semicolon \ (;) \ and \ Period \ (.)}$' + '\n' +
            r'$\mathbf{[Independent \ Clause] \ ; \ [Independent \ Clause]}$' + '\n' +
            r'$\bullet$ Both clauses must be grammatically complete.' + '\n' +
            r'$\bullet$ Never place a semicolon before a dependent fragment.' + '\n' +
            r'$\mathbf{Example:}$ The telescope gathered data; researchers verified it.',
            fontsize=10, color='#1e293b', bbox=box1, va='top', ha='center', transform=ax.transAxes)

    # Card 2: Colon
    box2 = dict(boxstyle='round,pad=0.6', facecolor='#f0fdf4', edgecolor='#16a34a', lw=1.8)
    ax.text(0.76, 0.76,
            r'$\mathbf{2. \ The \ Colon \ (:) \ Requirement}$' + '\n' +
            r'$\mathbf{[100\% \ Complete \ Independent \ Sentence] \ : \ [Explanation]}$' + '\n' +
            r'$\bullet$ Preceding clause MUST stand completely alone.' + '\n' +
            r'$\bullet$ Followed by a noun, list, or explanatory sentence.' + '\n' +
            r'$\mathbf{Example:}$ She made a discovery: corals emit bio-light.',
            fontsize=10, color='#1e293b', bbox=box2, va='top', ha='center', transform=ax.transAxes)

    # Card 3: Em-Dashes
    box3 = dict(boxstyle='round,pad=0.6', facecolor='#fef3c7', edgecolor='#d97706', lw=1.8)
    ax.text(0.24, 0.32,
            r'$\mathbf{3. \ Em-Dash \ Pair \ (— \ ... \ —)}$' + '\n' +
            r'$\mathbf{[Subject] \ — \ [Non\text{-}Essential \ Aside] \ — \ [Verb]}$' + '\n' +
            r'$\bullet$ Dashes must come in matching pairs for mid-sentence insertions.' + '\n' +
            r'$\bullet$ Removing the dashed phrase leaves a valid sentence.' + '\n' +
            r'$\mathbf{Example:}$ The archive — thought destroyed — was preserved.',
            fontsize=10, color='#1e293b', bbox=box3, va='top', ha='center', transform=ax.transAxes)

    # Card 4: Comma Splice Trap
    box4 = dict(boxstyle='round,pad=0.6', facecolor='#fef2f2', edgecolor='#ef4444', lw=2.0)
    ax.text(0.76, 0.32,
            r'$\mathbf{4. \ The \ Fatal \ Trap: \ Comma \ Splice}$' + '\n' +
            r'$\mathbf{ILLEGAL: \ [Independent] \ , \ [Independent] \ \times}$' + '\n' +
            r'$\bullet$ A comma alone CANNOT join two complete sentences.' + '\n' +
            r'$\bullet$ Fix with Period, Semicolon, or Comma + FANBOYS.' + '\n' +
            r'$\mathbf{Fix:}$ The experiment ended, $\mathbf{and}$ the team published.',
            fontsize=10, color='#991b1b', bbox=box4, va='top', ha='center', transform=ax.transAxes)

    ax.text(0.5, 0.94, 'Digital SAT Sentence Boundary & Punctuation Framework',
            ha='center', va='center', fontsize=14, fontweight='bold', color='#0f172a', transform=ax.transAxes)

    plt.tight_layout()
    out_path = os.path.join(OUT_DIR, "diagram_punctuation_flowchart.png")
    plt.savefig(out_path, dpi=300)
    plt.close()
    print("Saved:", out_path)

if __name__ == "__main__":
    print("Generating publication-grade SAT diagrams...")
    generate_slope_diagram()
    generate_parabola_diagram()
    generate_triangles_diagram()
    generate_circle_diagram()
    generate_balance_scale_diagram()
    generate_punctuation_diagram()
    print("All 6 high-resolution diagrams generated successfully!")
