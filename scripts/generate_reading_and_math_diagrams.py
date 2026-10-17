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
# 1. RHETORICAL TRANSITIONS TAXONOMY (READING & WRITING: EXP-01)
# -------------------------------------------------------------
def generate_rhetorical_transitions():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.axis('off')

    # Title
    ax.text(0.5, 0.95, "Digital SAT Rhetorical Transitions Master Taxonomy",
            fontsize=13.5, fontweight='black', ha='center', va='top', color='#0f172a')
    ax.text(0.5, 0.90, "The 4 Universal Logical Relationships Tested on Reading & Writing Module 1 & 2",
            fontsize=9.5, ha='center', va='top', color='#64748b', style='italic')

    categories = [
        {
            "name": "1. CONTINUATION & ADDITION",
            "desc": "Next sentence builds directly upon, agrees with, or adds to the previous claim.",
            "color": "#1d4ed8",
            "bgcolor": "#eff6ff",
            "edgecolor": "#93c5fd",
            "words": "Furthermore • Moreover • In addition • Additionally • Indeed • Similarly",
            "example": "\"The experiment confirmed the hypothesis; furthermore, it uncovered new enzymatic pathways.\"",
            "y": 0.72
        },
        {
            "name": "2. CONTRAST & CONCESSION",
            "desc": "Next sentence reverses, limits, contradicts, or introduces a caveat to the prior thought.",
            "color": "#b91c1c",
            "bgcolor": "#fef2f2",
            "edgecolor": "#fca5a5",
            "words": "However • Nevertheless • Nonetheless • In contrast • Conversely • Still • Yet",
            "example": "\"Initial data seemed promising; however, subsequent trials failed to replicate the yield.\"",
            "y": 0.51
        },
        {
            "name": "3. CAUSATION & RESULT",
            "desc": "Next sentence represents a direct logical result, effect, conclusion, or consequence.",
            "color": "#047857",
            "bgcolor": "#ecfdf5",
            "edgecolor": "#6ee7b7",
            "words": "Therefore • Consequently • Thus • As a result • Accordingly • Hence",
            "example": "\"Heavy rainfall eroded the topsoil; consequently, crop output dropped by 30%.\"",
            "y": 0.30
        },
        {
            "name": "4. EXEMPLIFICATION & CLARIFICATION",
            "desc": "Next sentence provides a specific concrete instance or restates in simpler terms.",
            "color": "#6d28d9",
            "bgcolor": "#f5f3ff",
            "edgecolor": "#c4b5fd",
            "words": "For example • For instance • Specifically • That is • To illustrate • In other words",
            "example": "\"Certain conifers survive extreme cold; for instance, the Siberian larch endures -60°C.\"",
            "y": 0.09
        }
    ]

    for cat in categories:
        y = cat["y"]
        # Outer box
        rect = patches.FancyBboxPatch((0.04, y - 0.06), 0.92, 0.17,
                                     boxstyle="round,pad=0.02,rounding_size=0.02",
                                     linewidth=1.2, edgecolor=cat["edgecolor"], facecolor=cat["bgcolor"])
        ax.add_patch(rect)

        # Header Badge
        ax.text(0.06, y + 0.08, cat["name"], fontsize=10.5, fontweight='bold', color=cat["color"], va='top')
        ax.text(0.48, y + 0.078, cat["desc"], fontsize=8.5, color='#334155', va='top')

        # Words
        ax.text(0.06, y + 0.025, f"High-Yield Connectors:  {cat['words']}",
                fontsize=8.5, fontweight='bold', color='#0f172a', va='top')

        # Example
        ax.text(0.06, y - 0.025, f"SAT Usage:  {cat['example']}",
                fontsize=8.2, color='#475569', style='italic', va='top')

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_rhetorical_transitions.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 2. SENTENCE BOUNDARIES & PUNCTUATION TREE (READING & WRITING: SEC-01)
# -------------------------------------------------------------
def generate_sentence_boundaries():
    fig, ax = plt.subplots(figsize=(10, 6.8), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.axis('off')

    ax.text(0.5, 0.96, "Digital SAT Sentence Boundaries & Punctuation Invariants",
            fontsize=13.5, fontweight='black', ha='center', va='top', color='#0f172a')
    ax.text(0.5, 0.91, "How to Eliminate Comma Splices, Run-ons, and Fragments in 5 Seconds",
            fontsize=9.5, ha='center', va='top', color='#64748b', style='italic')

    # Top Formula: Independent vs Dependent Clauses
    top_box = patches.FancyBboxPatch((0.05, 0.77), 0.90, 0.10,
                                    boxstyle="round,pad=0.015,rounding_size=0.015",
                                    facecolor="#f1f5f9", edgecolor="#cbd5e1", linewidth=1.2)
    ax.add_patch(top_box)
    ax.text(0.07, 0.84, "INDEPENDENT CLAUSE (IC): Complete thought, has Subject + Verb, can stand alone as a sentence.",
            fontsize=8.5, fontweight='bold', color='#1e293b')
    ax.text(0.07, 0.795, "DEPENDENT CLAUSE (DC): Starts with subordinating word (Although, Because, When, Since...), cannot stand alone.",
            fontsize=8.5, color='#475569')

    # Left: The 4 Valid Ways to Join Two Independent Clauses
    left_box = patches.FancyBboxPatch((0.05, 0.08), 0.43, 0.65,
                                     boxstyle="round,pad=0.02,rounding_size=0.02",
                                     facecolor="#ecfdf5", edgecolor="#6ee7b7", linewidth=1.5)
    ax.add_patch(left_box)

    ax.text(0.08, 0.69, "4 VALID WAYS TO JOIN:  IC + IC", fontsize=10.5, fontweight='bold', color='#065f46')

    valid_rules = [
        ("1. Period (.):", "IC . IC", "\"The bell rang. The students departed.\""),
        ("2. Semicolon (;):", "IC ; IC", "\"The bell rang; the students departed.\""),
        ("3. Comma + FANBOYS:", "IC , [and/but/so] IC", "\"The bell rang, and the students departed.\""),
        ("4. Colon / Dash (: or —):", "IC : Explanation", "\"He had one goal: pass the examination.\""),
    ]

    y_pos = 0.62
    for title, rule, ex in valid_rules:
        ax.text(0.08, y_pos, title, fontsize=9.0, fontweight='bold', color='#047857')
        ax.text(0.28, y_pos, rule, fontsize=9.0, fontweight='bold', fontfamily='monospace', color='#0f172a')
        ax.text(0.08, y_pos - 0.04, ex, fontsize=8.0, style='italic', color='#334155')
        y_pos -= 0.125

    # Right: The Fatal College Board Errors & Traps
    right_box = patches.FancyBboxPatch((0.52, 0.08), 0.43, 0.65,
                                      boxstyle="round,pad=0.02,rounding_size=0.02",
                                      facecolor="#fef2f2", edgecolor="#fca5a5", linewidth=1.5)
    ax.add_patch(right_box)

    ax.text(0.55, 0.69, "FATAL COLLEGE BOARD TRAPS & PITFALLS", fontsize=10.5, fontweight='bold', color='#991b1b')

    fatal_traps = [
        ("1. Comma Splice Trap:", "IC , IC  (ERROR!)", "A lone comma can NEVER join two complete sentences.\nError: \"The bell rang, the students departed.\""),
        ("2. Run-on Sentence:", "IC IC  (ERROR!)", "Two complete sentences jammed with no punctuation.\nError: \"The bell rang the students departed.\""),
        ("3. Sentence Fragment:", "DC alone  (ERROR!)", "A dependent clause left without a main clause.\nError: \"Because the bell rang loudly.\""),
        ("4. Semicolon = Period Rule:", "Period = Semicolon", "If choice A has ( . ) and choice B has ( ; ) with identical\nwords, BOTH are grammatically identical -> Eliminate both!"),
    ]

    y_pos = 0.62
    for title, rule, desc in fatal_traps:
        ax.text(0.55, y_pos, title, fontsize=9.0, fontweight='bold', color='#b91c1c')
        ax.text(0.76, y_pos, rule, fontsize=8.5, fontweight='bold', fontfamily='monospace', color='#dc2626')
        for i, line in enumerate(desc.split('\n')):
            ax.text(0.55, y_pos - 0.035 - (i * 0.03), line, fontsize=7.6, color='#475569')
        y_pos -= 0.125

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_sentence_boundaries.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 3. EXPONENTIAL VS LINEAR GROWTH (ADVANCED MATH: ADV-03)
# -------------------------------------------------------------
def generate_exponential_vs_linear():
    fig, ax = plt.subplots(figsize=(8.5, 5.8), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.grid(True, which='both', color='#e2e8f0', linestyle='--', linewidth=0.8, alpha=0.8)

    t = np.linspace(0, 10, 200)

    # Linear: y = 15t + 20 (Constant ADDITION of $15 per unit)
    y_lin = 15 * t + 20

    # Exponential: y = 20 * (1.35)^t (Constant PERCENT MULTIPLICATION of 35% per unit)
    y_exp = 20 * (1.38 ** t)

    ax.plot(t, y_lin, color='#2563eb', linewidth=2.8, label=r'Linear: $f(t) = 15t + 20$ (Adds $15$ each period)', zorder=4)
    ax.plot(t, y_exp, color='#dc2626', linewidth=3.0, label=r'Exponential: $g(t) = 20(1.38)^t$ (Multiplies by $1.38$)', zorder=5)

    # Find crossover
    ax.scatter([0], [20], color='#0f172a', s=80, zorder=6)
    ax.annotate(r'Initial Value $a = 20$', xy=(0, 20), xytext=(0.6, 50),
                arrowprops=dict(arrowstyle='->', lw=1.2, color='#0f172a'), fontsize=9, fontweight='bold')

    # Crossover annotation
    ax.scatter([5.1], [96.5], color='#7c3aed', s=100, zorder=6)
    ax.annotate(r'$\mathbf{Exponential \ Dominance:}$' + '\nExponential always overtakes\nlinear growth as $t \to \infty$.',
                xy=(5.1, 96.5), xytext=(3.0, 170),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#7c3aed'),
                bbox=dict(boxstyle='round,pad=0.4', facecolor='#f5f3ff', edgecolor='#c4b5fd', lw=1.2),
                fontsize=8.5, color='#581c87')

    # Formula comparison box
    ax.text(0.5, 330,
            r'$\mathbf{SAT \ Word \ Problem \ Decoder:}$' + '\n' +
            r'• $\mathbf{Linear:}$ "Increases by $d$ dollars each year" $\to y = mt + b$' + '\n' +
            r'• $\mathbf{Exponential:}$ "Increases by $r\%$ each year" $\to y = a(1 + r)^t$' + '\n' +
            r'• $\mathbf{Half-life:}$ $A(t) = A_0\left(\frac{1}{2}\right)^{t/h}$  |  $\mathbf{Doubling:}$ $P(t) = P_0(2)^{t/d}$',
            fontsize=9.2, color='#1e293b',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='#eff6ff', edgecolor='#93c5fd', lw=1.2))

    ax.set_title('Digital SAT Linear vs. Exponential Growth Comparison', fontsize=12.5, fontweight='bold', pad=12, color='#0f172a')
    ax.set_xlabel('Time Period $t$ (e.g. Years, Hours)', fontsize=10.5, labelpad=8)
    ax.set_ylabel('Quantity $Q(t)$', fontsize=10.5, labelpad=8)
    ax.set_xlim(-0.5, 10.5)
    ax.set_ylim(0, 480)
    ax.legend(loc='upper right', frameon=True, facecolor='#ffffff', edgecolor='#cbd5e1', fontsize=9.2)

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_exponential_vs_linear.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 4. SYSTEMS OF EQUATIONS CLASSIFICATION (ALGEBRA: ALG-03)
# -------------------------------------------------------------
def generate_systems_classification():
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(11.5, 4.2), dpi=300)
    fig.patch.set_facecolor('#ffffff')

    x = np.linspace(-3, 3, 100)

    # 1. Exactly 1 Solution (Intersecting)
    ax1.set_facecolor('#fafafc')
    ax1.grid(True, color='#e2e8f0', linestyle='--', linewidth=0.8)
    y1 = 1.2 * x + 0.5
    y2 = -0.8 * x - 1.0
    ax1.plot(x, y1, color='#2563eb', linewidth=2.2, label=r'$L_1: y = 1.2x + 0.5$')
    ax1.plot(x, y2, color='#dc2626', linewidth=2.2, label=r'$L_2: y = -0.8x - 1$')
    # Intersection
    xi, yi = -0.75, -0.4
    ax1.scatter([xi], [yi], color='#16a34a', s=90, zorder=5)
    ax1.set_title("Case 1: 1 Unique Solution\nDifferent Slopes ($m_1 \\neq m_2$)", fontsize=10, fontweight='bold', color='#0f172a')
    ax1.text(0, -2.5, r'Lines intersect at 1 point' + '\n' + r'$\frac{a_1}{a_2} \neq \frac{b_1}{b_2}$',
             ha='center', fontsize=8.5, bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0fdf4', edgecolor='#86efac'))
    ax1.set_ylim(-3, 3)

    # 2. No Solution (Parallel)
    ax2.set_facecolor('#fafafc')
    ax2.grid(True, color='#e2e8f0', linestyle='--', linewidth=0.8)
    y1_par = 1.0 * x + 1.2
    y2_par = 1.0 * x - 1.2
    ax2.plot(x, y1_par, color='#2563eb', linewidth=2.2, label=r'$L_1: y = x + 1.2$')
    ax2.plot(x, y2_par, color='#dc2626', linewidth=2.2, label=r'$L_2: y = x - 1.2$')
    ax2.set_title("Case 2: No Solution (0)\nEqual Slopes, Different Intercepts", fontsize=10, fontweight='bold', color='#0f172a')
    ax2.text(0, -2.5, r'Parallel lines, never intersect' + '\n' + r'$\frac{a_1}{a_2} = \frac{b_1}{b_2} \neq \frac{c_1}{c_2}$',
             ha='center', fontsize=8.5, bbox=dict(boxstyle='round,pad=0.3', facecolor='#fef2f2', edgecolor='#fca5a5'))
    ax2.set_ylim(-3, 3)

    # 3. Infinitely Many Solutions (Coincident)
    ax3.set_facecolor('#fafafc')
    ax3.grid(True, color='#e2e8f0', linestyle='--', linewidth=0.8)
    y_same = 0.8 * x
    ax3.plot(x, y_same, color='#2563eb', linewidth=4.0, alpha=0.6, label=r'$L_1$')
    ax3.plot(x, y_same, color='#dc2626', linewidth=2.0, linestyle='--', label=r'$L_2$ (Same line)')
    ax3.set_title("Case 3: Infinitely Many Solutions\nIdentical Slopes & Intercepts", fontsize=10, fontweight='bold', color='#0f172a')
    ax3.set_ylim(-3, 3)

    plt.suptitle("Digital SAT Systems of Linear Equations: Complete Geometric Classification",
                 fontsize=12, fontweight='bold', y=1.02, color='#0f172a')
    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_systems_classification.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

# -------------------------------------------------------------
# 5. RHETORICAL SYNTHESIS & RESEARCH NOTES (READING & WRITING: EXP-02)
# -------------------------------------------------------------
def generate_rhetorical_synthesis():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#fafafc')
    ax.axis('off')

    ax.text(0.5, 0.96, "Digital SAT Rhetorical Synthesis: 3-Step Target Algorithm",
            fontsize=13.5, fontweight='black', ha='center', va='top', color='#0f172a')
    ax.text(0.5, 0.91, "How 800-Scorers Solve 'The Student Wants to...' Questions in 20 Seconds",
            fontsize=9.5, ha='center', va='top', color='#64748b', style='italic')

    steps = [
        {
            "step": "STEP 1: READ THE LAST SENTENCE FIRST (THE GOAL)",
            "sub": "Do NOT read the bullet points first. Jump straight to the prompt question.",
            "rule": "Identify the exact communicative goal: e.g. \"emphasize a similarity\", \"contrast findings\", \"introduce the artist to a new audience\".",
            "color": "#1d4ed8", "bg": "#eff6ff", "edge": "#93c5fd", "y": 0.73
        },
        {
            "step": "STEP 2: ELIMINATE FACTUALLY TRUE BUT IRRELEVANT CHOICES",
            "sub": "College Board traps always include 2-3 choices that are 100% true to the notes, but fail the goal.",
            "rule": "Trap 1: Introduces the work when prompt asked for contrast.\nTrap 2: Details technical specifications when prompt asked for summary.",
            "color": "#b91c1c", "bg": "#fef2f2", "edge": "#fca5a5", "y": 0.49
        },
        {
            "step": "STEP 3: VERIFY THE WINNING SENTENCE SATISFIES THE GOAL",
            "sub": "The correct answer directly and concisely accomplishes the specific request.",
            "rule": "Example: If goal = \"emphasize similarity\", the correct answer MUST contain words like \"both\", \"similarly\", \"alike\", or shared characteristics.",
            "color": "#047857", "bg": "#ecfdf5", "edge": "#6ee7b7", "y": 0.25
        }
    ]

    for s in steps:
        y = s["y"]
        rect = patches.FancyBboxPatch((0.05, y - 0.08), 0.90, 0.19,
                                     boxstyle="round,pad=0.02,rounding_size=0.02",
                                     linewidth=1.3, edgecolor=s["edge"], facecolor=s["bg"])
        ax.add_patch(rect)
        ax.text(0.08, y + 0.085, s["step"], fontsize=10.0, fontweight='bold', color=s["color"], va='top')
        ax.text(0.08, y + 0.035, s["sub"], fontsize=8.5, fontweight='bold', color='#1e293b', va='top')
        for i, line in enumerate(s["rule"].split('\n')):
            ax.text(0.08, y - 0.015 - (i * 0.035), line, fontsize=8.2, color='#475569', va='top')

    plt.tight_layout()
    out = os.path.join(OUT_DIR, "diagram_rhetorical_synthesis.png")
    plt.savefig(out, dpi=300)
    plt.close()
    print("Saved:", out)

if __name__ == "__main__":
    generate_rhetorical_transitions()
    generate_sentence_boundaries()
    generate_exponential_vs_linear()
    generate_systems_classification()
    generate_rhetorical_synthesis()
    print("All 5 publication-grade diagrams generated successfully!")
