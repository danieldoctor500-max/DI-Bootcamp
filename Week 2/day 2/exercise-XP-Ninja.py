# Conway's Game of Life
import time
import os
import random


class Cell:

    def __init__(self, x, y, is_alive=False):
        self.x = x
        self.y = y
        self.is_alive = is_alive

    def __repr__(self):
        return "■" if self.is_alive else " "


class GameOfLife:

    def __init__(self, rows=20, cols=40, expandable=False, max_border=10000):
        self.rows = rows
        self.cols = cols
        self.expandable = expandable
        self.max_border = max_border
        self.generation = 0
        self.grid = self._create_empty_grid(self.rows, self.cols)

    def _create_empty_grid(self, rows, cols):
        """Creates a 2D grid filled with dead Cell instances."""
        return [[Cell(r, c) for c in range(cols)] for r in range(rows)]

    def seed_random(self, density=0.25):
        """Randomly populates the grid based on density."""
        for r in range(self.rows):
            for c in range(self.cols):
                self.grid[r][c].is_alive = random.random() < density

    def set_pattern(self, start_row, start_col, pattern):
        """Loads a custom coordinate pattern onto the grid."""
        for r, c in pattern:
            grid_r, grid_c = start_row + r, start_col + c
            if 0 <= grid_r < self.rows and 0 <= grid_c < self.cols:
                self.grid[grid_r][grid_c].is_alive = True

    def count_live_neighbors(self, r, c):
        """Counts the 8 adjacent live neighbors of cell (r, c)."""
        live_count = 0
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue

                nr, nc = r + dr, c + dc
                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    if self.grid[nr][nc].is_alive:
                        live_count += 1
        return live_count

    def _check_border_expansion(self):
        """Checks if live cells touch any boundary and expands the grid up to max_border."""
        top_row_has_life = any(cell.is_alive for cell in self.grid[0])
        bottom_row_has_life = any(cell.is_alive for cell in self.grid[-1])
        left_col_has_life = any(self.grid[r][0].is_alive for r in range(self.rows))
        right_col_has_life = any(self.grid[r][-1].is_alive for r in range(self.rows))

        needs_expansion = top_row_has_life or bottom_row_has_life or left_col_has_life or right_col_has_life

        if needs_expansion and (self.rows < self.max_border and self.cols < self.max_border):
            new_rows = self.rows + 2
            new_cols = self.cols + 2
            new_grid = self._create_empty_grid(new_rows, new_cols)

            # Copy existing grid into the expanded middle area
            for r in range(self.rows):
                for c in range(self.cols):
                    new_grid[r + 1][c + 1].is_alive = self.grid[r][c].is_alive

            self.rows = new_rows
            self.cols = new_cols
            self.grid = new_grid

    def step(self):
        """Calculates and updates the next generation based on Game of Life rules."""
        if self.expandable:
            self._check_border_expansion()

        # Build next generation grid state
        next_grid = self._create_empty_grid(self.rows, self.cols)

        for r in range(self.rows):
            for c in range(self.cols):
                neighbors = self.count_live_neighbors(r, c)
                is_currently_alive = self.grid[r][c].is_alive

                # Apply Conway's Rules
                if is_currently_alive and (neighbors == 2 or neighbors == 3):
                    next_grid[r][c].is_alive = True
                elif not is_currently_alive and neighbors == 3:
                    next_grid[r][c].is_alive = True
                else:
                    next_grid[r][c].is_alive = False

        self.grid = next_grid
        self.generation += 1

    def display(self):
        """Prints the grid to the console."""
        os.system('cls' if os.name == 'nt' else 'clear')
        border_h = "+" + "-" * self.cols + "+"
        print(f"Generation: {self.generation} | Dimensions: {self.rows}x{self.cols}")
        print(border_h)
        for row in self.grid:
            line = "".join(str(cell) for cell in row)
            print(f"|{line}|")
        print(border_h)

    def run(self, steps=100, delay=0.1):
        """Runs the simulation loop."""
        for _ in range(steps):
            self.display()
            self.step()
            time.sleep(delay)


# Common Test Patterns
GLIDER = [(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
PULSAR = [
    (0, 2), (0, 3), (0, 4), (0, 8), (0, 9), (0, 10),
    (5, 2), (5, 3), (5, 4), (5, 8), (5, 9), (5, 10),
    (2, 0), (3, 0), (4, 0), (2, 5), (3, 5), (4, 5),
    (2, 7), (3, 7), (4, 7), (2, 12), (3, 12), (4, 12)
]

if __name__ == "__main__":

    game = GameOfLife(rows=20, cols=40, expandable=False)

    game.set_pattern(start_row=1, start_col=1, pattern=GLIDER)

    game.run(steps=100, delay=0.1)