import drawsvg as dw
import math

def draw_konark_wheel_detailed(filename="konark_wheel_detailed.svg"):
    """
    Draws a more detailed vector representation of the Konark wheel.
    """
    d = dw.Drawing(600, 600, origin='center')
    center_x, center_y = 0, 0
    outer_radius = 250
    inner_radius = 60
    
    # Outer ring
    d.append(dw.Circle(center_x, center_y, outer_radius, fill='none', stroke='black', stroke_width=5))
    
    # Central hub
    d.append(dw.Circle(center_x, center_y, inner_radius, fill='none', stroke='black', stroke_width=5))
    
    # Spokes and intermediate details
    num_spokes = 16
    spoke_spacing_degrees = 360 / num_spokes
    
    for i in range(num_spokes):
        angle_rad = math.radians(i * spoke_spacing_degrees)
        
        # Define coordinates for spokes
        x_start = center_x + inner_radius * math.cos(angle_rad)
        y_start = center_y + inner_radius * math.sin(angle_rad)
        x_end = center_x + outer_radius * math.cos(angle_rad)
        y_end = center_y + outer_radius * math.sin(angle_rad)
        
        # Add spokes with alternating widths
        stroke_width = 5 if i % 2 == 0 else 2.5
        d.append(dw.Line(x_start, y_start, x_end, y_end, stroke='black', stroke_width=stroke_width))

        # Add "beads" between spokes
        mid_radius = (outer_radius + inner_radius) / 2
        bead_angle_rad = math.radians((i + 0.5) * spoke_spacing_degrees)
        bead_x = center_x + mid_radius * math.cos(bead_angle_rad)
        bead_y = center_y + mid_radius * math.sin(bead_angle_rad)
        d.append(dw.Circle(bead_x, bead_y, 4, fill='black'))
        
    d.save_svg(filename)
    print(f"Detailed Konark wheel saved to '{filename}'")

# Run the function to generate the detailed SVG file
draw_konark_wheel_detailed()
